import { useCallback, useEffect, useRef } from 'react'

interface UseIntervalOptions {
  callback: () => void
  delay: number
  isPaused?: boolean
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const useInterval = ({
  callback,
  delay,
  isPaused = false,
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
    if (isPaused) {
      pauseInterval()
    }

    if (!isPaused) {
      resumeInterval()
    }

    return () => {
      pauseInterval()
    }
  }, [isPaused, pauseInterval, resumeInterval])
}

export default useInterval
