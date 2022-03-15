import { useRef, useState, useCallback } from 'react'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-shared'

const useSafeState = <S>(initState: S | (() => S)) => {
  const [state, unsafeSetState] = useState<S>(initState)

  const isMounted = useRef(false)

  useIsomorphicLayoutEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  })

  const setState: typeof unsafeSetState = useCallback(newState => {
    if (isMounted.current) {
      unsafeSetState(newState)
    }
  }, [])

  return [state, setState]
}

export default useSafeState as typeof useState
