import React, { useCallback } from 'react'
import type { GliderMethods } from 'react-glider/dist/types'

export type Props = {
  gliderRef: React.RefObject<
    GliderMethods & {
      track: HTMLDivElement
    }
  >
  slidesToScroll: number
  autoplay: boolean
  autoplayDelay: number
  rewind: boolean
  currentSlide: number
  intervalRef: React.MutableRefObject<NodeJS.Timer | undefined>
  isOnLastSlide: boolean
}

const useAutoplay = ({
  gliderRef,
  currentSlide,
  intervalRef,
  slidesToScroll,
  autoplay,
  autoplayDelay,
  rewind,
  isOnLastSlide,
}: Props) => {
  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }, [intervalRef])

  const startAutoplay = useCallback(() => {
    if (gliderRef.current && autoplay) {
      const glider = gliderRef.current

      intervalRef.current = setInterval(() => {
        if (isOnLastSlide) {
          if (!rewind) {
            stopAutoplay()
          } else {
            glider.scrollItem(0)
          }
        } else {
          glider.scrollItem(currentSlide + slidesToScroll)
        }
      }, autoplayDelay)
    }
  }, [
    autoplay,
    slidesToScroll,
    autoplayDelay,
    rewind,
    stopAutoplay,
    gliderRef,
    intervalRef,
    currentSlide,
    isOnLastSlide,
  ])

  return [startAutoplay, stopAutoplay]
}

export default useAutoplay
