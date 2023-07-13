import type { ForwardedRef } from 'react'
import { useCallback } from 'react'

const forwardRef = <T>(ref: ForwardedRef<T>, value: T) => {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    ref.current = value
  }
}

/**
 * This hook allows to forward ref to multiple holders.
 *
 * @example
 *
 *   const ref1 = useRef(null)
 *   const ref2 = useRef(null)
 *
 *   const ref = useMultipleForwardRefs([ref1, ref2])
 *
 *   <div ref={ref} />
 *
 *   console.log(ref1.current) // <div />
 *   console.log(ref2.current) // <div />
 */
const useMultipleForwardRefs = <T>(refs: ForwardedRef<T>[]) =>
  useCallback(
    (refValue: T) => {
      for (const ref of refs) {
        forwardRef(ref, refValue)
      }
    },
    [...refs]
  )

export default useMultipleForwardRefs
