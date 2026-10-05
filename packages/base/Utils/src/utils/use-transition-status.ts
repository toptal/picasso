import type { RefObject } from 'react'
import { useRef, useState } from 'react'
import type { TransitionProps } from '@toptal/picasso-shared'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-shared'

export type TransitionStatus =
  | 'entering'
  | 'entered'
  | 'exiting'
  | 'exited'
  | 'unmounted'

/** The `timeout` prop every transition component takes: one duration, or one per phase */
export type TransitionTimeout = NonNullable<TransitionProps['timeout']>

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
  /** The transitioning DOM element, passed to the lifecycle callbacks; `null` while nothing takes the ref */
  nodeRef: RefObject<T | null>
  /** Fired when the enter phase starts */
  onEnter?: (node: T | null, isAppearing: boolean) => void
  /** Fired when the exit transition settles */
  onExited?: (node: T | null) => void
}

export interface UseTransitionStatusResult {
  /** Where the element is in its transition */
  status: TransitionStatus
  /** Duration of the running or upcoming phase in milliseconds, for the CSS `transition-duration` */
  duration: number
}

interface TransitionState {
  status: TransitionStatus
  /** The mount transition is the `appear` one; the flag holds until the first exit */
  isAppearing: boolean
}

type PendingSettle =
  | { phase: 'enter'; isAppearing: boolean }
  | { phase: 'exit' }

const getSettleDelay = (
  pending: PendingSettle,
  timeouts: ReturnType<typeof getTransitionTimeouts>
) => {
  if (pending.phase === 'exit') {
    return timeouts.exit
  }

  return pending.isAppearing ? timeouts.appear : timeouts.enter
}

/**
 * Drop-in replacement for react-transition-group's `<Transition>` state
 * machine. Settles on `setTimeout(timeout)` — not `transitionend` — so
 * callback timing is identical and fake timers drive it in jsdom tests.
 * Returns the status together with the duration of the current phase, so
 * the CSS transition and the settle timer never disagree.
 */
const useTransitionStatus = <T extends HTMLElement>(
  options: UseTransitionStatusOptions<T>
): UseTransitionStatusResult => {
  const {
    in: inOption,
    appear = false,
    unmountOnExit = false,
    nodeRef,
    timeout,
  } = options
  // By its truthiness, as react-transition-group read it: an `undefined` that
  // becomes `false` starts no exit
  const inProp = Boolean(inOption)

  const [{ status, isAppearing }, setTransition] = useState<TransitionState>(
    () => {
      if (inProp) {
        return { status: appear ? 'exited' : 'entered', isAppearing: appear }
      }

      return {
        status: unmountOnExit ? 'unmounted' : 'exited',
        isAppearing: false,
      }
    }
  )

  // An unmounted element re-mounts at `exited` before entering
  // (render-phase derived state)
  if (inProp && status === 'unmounted') {
    setTransition(previous => ({ ...previous, status: 'exited' }))
  }

  // Read via ref so the transition effect re-runs only on `in` flips;
  // timeout/callback changes must not restart a running transition
  const optionsRef = useRef(options)

  useIsomorphicLayoutEffect(() => {
    optionsRef.current = options
  })

  const prevInRef = useRef<boolean | null>(null)
  const pendingSettleRef = useRef<PendingSettle | null>(null)

  useIsomorphicLayoutEffect(() => {
    const prevIn = prevInRef.current
    const isInitialMount = prevIn === null

    prevInRef.current = inProp

    const timeouts = getTransitionTimeouts(optionsRef.current.timeout)

    const scheduleSettle = (pending: PendingSettle) =>
      setTimeout(() => {
        pendingSettleRef.current = null

        if (pending.phase === 'enter') {
          setTransition(previous => ({ ...previous, status: 'entered' }))

          return
        }

        setTransition(previous => ({ ...previous, status: 'exited' }))
        // Also without a node, as react-transition-group called it
        optionsRef.current.onExited?.(nodeRef.current)
      }, getSettleDelay(pending, timeouts))

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

      const timer = scheduleSettle(pending)

      return () => clearTimeout(timer)
    }

    // Mounting hidden never exits; mounting shown enters only with `appear`
    if (isInitialMount && (!inProp || !appear)) {
      return
    }

    const node = nodeRef.current

    const startEnter = (): PendingSettle => {
      optionsRef.current.onEnter?.(node, isInitialMount)

      setTransition({ status: 'entering', isAppearing: isInitialMount })

      return { phase: 'enter', isAppearing: isInitialMount }
    }

    const startExit = (): PendingSettle => {
      setTransition({ status: 'exiting', isAppearing: false })

      return { phase: 'exit' }
    }

    const pending = inProp ? startEnter() : startExit()

    pendingSettleRef.current = pending

    const timer = scheduleSettle(pending)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- transitions are keyed on `in` alone; the other options are read from optionsRef
  }, [inProp])

  // Unmount one commit after `exited`, so `onExited` observes the node
  useIsomorphicLayoutEffect(() => {
    if (unmountOnExit && !inProp && status === 'exited') {
      setTransition(previous => ({ ...previous, status: 'unmounted' }))
    }
  }, [unmountOnExit, inProp, status])

  const timeouts = getTransitionTimeouts(timeout)
  const enterDuration = isAppearing ? timeouts.appear : timeouts.enter
  const duration = inProp ? enterDuration : timeouts.exit

  return { status, duration }
}

export default useTransitionStatus
