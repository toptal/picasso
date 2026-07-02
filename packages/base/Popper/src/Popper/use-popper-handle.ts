import type { ForwardedRef } from 'react'
import { useCallback, useRef } from 'react'

/** Imperative handle exposed via `ref`, structurally compatible with the popper.js v1 instance surface consumers rely on */
export interface PopperHandle {
  /** The popper (floating) DOM element */
  popper: Element
  /** Recompute the popper position */
  update: () => void
  /** Recompute the popper position (popper.js v1 alias of `update`) */
  scheduleUpdate: () => void
}

// Mirrors the MUI v4 popperRef semantics: the handle exists only while the
// popper DOM element is mounted, so `ref.current?.popper` is always a node.
export const usePopperHandle = (
  ref: ForwardedRef<PopperHandle>,
  setFloating: (node: HTMLDivElement | null) => void,
  update: () => void
) => {
  const updateRef = useRef(update)

  updateRef.current = update

  return useCallback(
    (node: HTMLDivElement | null) => {
      setFloating(node)

      const handle: PopperHandle | null = node
        ? {
            popper: node,
            update: () => updateRef.current(),
            scheduleUpdate: () => updateRef.current(),
          }
        : null

      if (typeof ref === 'function') {
        ref(handle)
      } else if (ref) {
        ref.current = handle
      }
    },
    [setFloating, ref]
  )
}

export default usePopperHandle
