import { useEffect, useRef } from 'react'

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
}: UseIntervalOptions): {
  pauseInterval: () => void
  resumeInterval: () => void
} => {
  const savedCallback = useRef<() => void>()
  const savedDelay = useRef<number>(delay)
  const intervalId = useRef<NodeJS.Timeout>()

  // Remember the latest callback and delay.
  useEffect(() => {
    savedCallback.current = callback
    savedDelay.current = delay
  }, [callback, delay])

  // Set up the interval.
  useEffect(() => {
    const tick = () => savedCallback.current!()

    if (isPaused || intervalId.current) {
      clearInterval(intervalId.current!)
    }

    if (!isPaused) {
      intervalId.current = setInterval(tick, savedDelay.current)
    }

    return () => {
      clearInterval(intervalId.current!)
      intervalId.current = undefined
    }
  }, [isPaused])

  const pauseInterval = () => {
    clearInterval(intervalId.current!)
    intervalId.current = undefined
  }

  const resumeInterval = () => {
    if (!intervalId.current) {
      const tick = () => savedCallback.current!()

      intervalId.current = setInterval(tick, savedDelay.current)
    }
  }

  return { pauseInterval, resumeInterval }
}

export default useInterval
