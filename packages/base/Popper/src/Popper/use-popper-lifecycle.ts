import { useEffect, useRef } from 'react'

import type { PopperLifecycleCallback } from './popper-options'

interface UsePopperLifecycleOptions {
  open: boolean
  /** Positioned AND content committed — the popper is fully usable */
  ready: boolean
  x: number
  y: number
  onCreate?: PopperLifecycleCallback
  onUpdate?: PopperLifecycleCallback
}

// popper.js v1 callbacks declare a `data` argument we no longer provide;
// invoking with fewer arguments is safe, expressed once at this boundary
const toArgless = (callback?: PopperLifecycleCallback) =>
  callback as (() => void) | undefined

// Replicates popper.js v1's onCreate/onUpdate lifecycle: onCreate fires once
// per open cycle after the first successful positioning, onUpdate on each
// subsequent position change while open.
export const usePopperLifecycle = ({
  open,
  ready,
  x,
  y,
  onCreate,
  onUpdate,
}: UsePopperLifecycleOptions) => {
  const onCreateRef = useRef(onCreate)
  const onUpdateRef = useRef(onUpdate)

  onCreateRef.current = onCreate
  onUpdateRef.current = onUpdate

  const createdRef = useRef(false)

  useEffect(() => {
    if (!open) {
      createdRef.current = false

      return
    }

    if (!ready) {
      return
    }

    if (!createdRef.current) {
      createdRef.current = true
      toArgless(onCreateRef.current)?.()
    } else {
      toArgless(onUpdateRef.current)?.()
    }
  }, [open, ready, x, y])
}

export default usePopperLifecycle
