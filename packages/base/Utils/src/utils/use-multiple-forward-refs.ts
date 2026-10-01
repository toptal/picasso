import type { ForwardedRef } from 'react'
import { useCallback } from 'react'

import { isReact19OrNewer } from './is-react-19-or-newer'

// Returns what a callback ref returns: on React 19, possibly its cleanup
const forwardRef = <T>(ref: ForwardedRef<T>, value: T | null): unknown => {
  if (typeof ref === 'function') {
    return ref(value)
  }

  if (ref) {
    ref.current = value
  }

  return undefined
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
    (refValue: T | null) => {
      const cleanups = refs.map(ref => forwardRef(ref, refValue))

      // React 17 and 18 call the ref again with `null` on detach, and warn
      // when it returns a function
      if (!isReact19OrNewer) {
        return undefined
      }

      // React 19 runs this instead, so each ref gets its own cleanup, or the
      // `null` it would otherwise receive
      return () => {
        refs.forEach((ref, index) => {
          const cleanup = cleanups[index]

          if (typeof cleanup === 'function') {
            cleanup()
          } else {
            forwardRef(ref, null)
          }
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- the deps are the refs themselves, spread so each one is compared; the rule cannot see through a spread
    [...refs]
  )

export default useMultipleForwardRefs
