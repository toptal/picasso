/* eslint-disable import/no-extraneous-dependencies */
import { useRef, useState, useCallback, useEffect } from 'react'

const useSafeState = <S>(initState: S | (() => S)) => {
  const [state, unsafeSetState] = useState<S>(initState)

  const isMounted = useRef(false)

  useEffect(() => {
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
