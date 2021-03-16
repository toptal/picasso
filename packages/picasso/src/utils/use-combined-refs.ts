import { RefObject, Ref, useRef, useEffect } from 'react'

const useCombinedRefs = <T>(...refs: (RefObject<T> | Ref<T>)[]) => {
  const targetRef = useRef<T>(null)

  useEffect(() => {
    refs.forEach(ref => {
      if (!ref) {
        return
      }

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref.current = targetRef.current
      }
    })
  }, [refs])

  return targetRef
}

export default useCombinedRefs
