import { useCallback, useEffect, useRef } from 'react'

interface UseIntervalOptions {
  callback: () => void
  delay: number
  isActive?: boolean
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const useInterval = ({
  callback,
  delay,
  isActive = true,
}: UseIntervalOptions) => {
  const intervalId = useRef<NodeJS.Timeout>()

  const pauseInterval = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current!)
      intervalId.current = undefined
    }
  }, [])

  const resumeInterval = useCallback(() => {
    if (!intervalId.current) {
      intervalId.current = setInterval(callback, delay)
    }
  }, [callback, delay])

  useEffect(() => {
    if (!isActive) {
      pauseInterval()
    }

    if (isActive) {
      resumeInterval()
    }

    return () => {
      pauseInterval()
    }
  }, [isActive, pauseInterval, resumeInterval])
}

export default useInterval
