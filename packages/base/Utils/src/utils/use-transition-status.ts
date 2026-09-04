import type { RefObject } from 'react'
import { useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-shared'

export type TransitionStatus =
  | 'entering'
  | 'entered'
  | 'exiting'
  | 'exited'
  | 'unmounted'

export type TransitionTimeout =
  | number
  | { enter?: number; exit?: number; appear?: number }

/**
 * Resolves a react-transition-group style `timeout` (number or object)
 * into per-phase durations in ms; `appear` falls back to `enter`.
 */
export const getTransitionTimeouts = (
  timeout: TransitionTimeout | undefined
): { enter: number; exit: number; appear: number } => {
  if (typeof timeout === 'number') {
    return { enter: timeout, exit: timeout, appear: timeout }
  }

  return {
    enter: timeout?.enter ?? 0,
    exit: timeout?.exit ?? 0,
    appear: timeout?.appear ?? timeout?.enter ?? 0,
  }
}

export interface UseTransitionStatusOptions<T extends HTMLElement> {
  /** Show the element; toggling runs the enter or exit transition */
  in: boolean
  /** The duration for the transition, in milliseconds */
  timeout?: TransitionTimeout
  /** Run the enter transition when mounting with `in` already true */
  appear?: boolean
  /** Resolve to `unmounted` once fully exited, so the caller can render nothing */
  unmountOnExit?: boolean
  /** The transitioning DOM element, passed to the lifecycle callbacks */
  nodeRef: RefObject<T | null>
  /** Fired when the enter phase starts */
  onEnter?: (node: T, isAppearing: boolean) => void
  /** Fired right after the status flips to `entering` */
  onEntering?: (node: T, isAppearing: boolean) => void
  /** Fired when the enter transition settles */
  onEntered?: (node: T, isAppearing: boolean) => void
  /** Fired when the exit phase starts */
  onExit?: (node: T) => void
  /** Fired right after the status flips to `exiting` */
  onExiting?: (node: T) => void
  /** Fired when the exit transition settles */
  onExited?: (node: T) => void
}

/**
 * Drop-in replacement for react-transition-group's `<Transition>` state
 * machine. Settles on `setTimeout(timeout)` — not `transitionend` — so
 * callback timing is identical and fake timers drive it in jsdom tests.
 */
const useTransitionStatus = <T extends HTMLElement>(
  options: UseTransitionStatusOptions<T>
): TransitionStatus => {
  const { in: inProp, appear = false, unmountOnExit = false, nodeRef } = options

  const [status, setStatus] = useState<TransitionStatus>(() => {
    if (inProp) {
      return appear ? 'exited' : 'entered'
    }

    return unmountOnExit ? 'unmounted' : 'exited'
  })

  // An unmounted element re-mounts at `exited` before entering
  // (render-phase derived state)
  if (inProp && status === 'unmounted') {
    setStatus('exited')
  }

  // Read via ref so the transition effect re-runs only on `in` flips;
  // timeout/callback changes must not restart a running transition
  const optionsRef = useRef(options)

  useIsomorphicLayoutEffect(() => {
    optionsRef.current = options
  })

  const prevInRef = useRef<boolean | null>(null)
  const pendingSettleRef = useRef<
    { phase: 'enter'; isAppearing: boolean } | { phase: 'exit' } | null
  >(null)

  useIsomorphicLayoutEffect(() => {
    const prevIn = prevInRef.current
    const isInitialMount = prevIn === null

    prevInRef.current = inProp

    const timeouts = getTransitionTimeouts(optionsRef.current.timeout)

    const scheduleEnterSettle = (isAppearing: boolean) =>
      setTimeout(
        () => {
          pendingSettleRef.current = null
          setStatus('entered')

          const settledNode = nodeRef.current

          if (settledNode) {
            optionsRef.current.onEntered?.(settledNode, isAppearing)
          }
        },
        isAppearing ? timeouts.appear : timeouts.enter
      )

    const scheduleExitSettle = () =>
      setTimeout(() => {
        pendingSettleRef.current = null
        setStatus('exited')

        const settledNode = nodeRef.current

        if (settledNode) {
          optionsRef.current.onExited?.(settledNode)
        }
      }, timeouts.exit)

    // Effect replay without an `in` flip (StrictMode double invocation): never
    // re-fire the start callbacks, but reschedule a settle the replay's
    // cleanup cancelled so the transition still completes. (For comparison,
    // react-transition-group re-runs performEnter here, double-firing onEnter
    // in dev; we settle without the double-fire.)
    if (prevIn === inProp) {
      const pending = pendingSettleRef.current

      if (!pending) {
        return
      }

      const timer =
        pending.phase === 'enter'
          ? scheduleEnterSettle(pending.isAppearing)
          : scheduleExitSettle()

      return () => clearTimeout(timer)
    }

    // Mounting hidden never exits; mounting shown enters only with `appear`
    if (isInitialMount && (!inProp || !appear)) {
      return
    }

    const node = nodeRef.current

    const performEnter = () => {
      const isAppearing = isInitialMount

      if (node) {
        optionsRef.current.onEnter?.(node, isAppearing)
      }

      setStatus('entering')

      if (node) {
        optionsRef.current.onEntering?.(node, isAppearing)
      }

      pendingSettleRef.current = { phase: 'enter', isAppearing }

      return scheduleEnterSettle(isAppearing)
    }

    const performExit = () => {
      if (node) {
        optionsRef.current.onExit?.(node)
      }

      setStatus('exiting')

      if (node) {
        optionsRef.current.onExiting?.(node)
      }

      pendingSettleRef.current = { phase: 'exit' }

      return scheduleExitSettle()
    }

    const timer = inProp ? performEnter() : performExit()

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- transitions are keyed on `in` alone; the other options are read from optionsRef
  }, [inProp])

  // Unmount one commit after `exited`, so `onExited` observes the node
  useIsomorphicLayoutEffect(() => {
    if (unmountOnExit && !inProp && status === 'exited') {
      setStatus('unmounted')
    }
  }, [unmountOnExit, inProp, status])

  return status
}

export default useTransitionStatus
