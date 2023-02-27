import { useEffect, useRef } from 'react'

const useOnSecondRender = (callback: () => void) => {
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      callback()
    }
  }, [callback])
}

export default useOnSecondRender
