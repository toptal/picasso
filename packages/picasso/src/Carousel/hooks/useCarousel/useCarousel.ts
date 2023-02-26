import React, { useState, useRef, useCallback, useEffect } from 'react'
import Glider from 'glider-js'

import useOnScreen from '../../../utils/useOnScreen'
import useMouseEnter from '../../../utils/useMouseEnter'
import useInterval from '../../../utils/useInterval'
import isOnLastPage from '../../utils/isOnLastPage'
import getCurrentSlide from '../../utils/getCurrentSlide'

type Props = {
  autoplay: boolean
  autoplayDelay: number
  dotsRef: React.RefObject<HTMLDivElement>
  elementRef: React.RefObject<HTMLDivElement>
  nextRef: React.RefObject<HTMLButtonElement>
  onSlide?: (currentSlide: number) => void
  prevRef: React.RefObject<HTMLButtonElement>
  rewind: boolean
  slidesToScroll: number
  slidesToShow: number
}

const useCarousel = ({
  autoplay,
  autoplayDelay,
  dotsRef,
  elementRef,
  nextRef,
  onSlide,
  prevRef,
  rewind,
  slidesToScroll,
  slidesToShow,
}: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesCount, setSlidesCount] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const gliderRef = useRef<Glider<HTMLDivElement>>()

  const isOnScreen = useOnScreen({ ref: elementRef })
  const isMouseOver = useMouseEnter(elementRef)
  const isPaused = !autoplay || !isOnScreen || isMouseOver
  const isLastPage = isOnLastPage({
    currentSlide,
    slidesCount,
    slidesToShow,
  })

  useEffect(() => {
    setIsMounted(true)
  }, [setIsMounted])

  const initializeGlider = useCallback(() => {
    const element = elementRef.current

    if (element && !gliderRef.current) {
      gliderRef.current = new Glider(element, {
        slidesToShow,
        rewind,
        slidesToScroll,
        dots: dotsRef.current,
        arrows: {
          prev: prevRef.current,
          next: nextRef.current,
        },
      })

      setSlidesCount(gliderRef.current.track.childElementCount)
    }
  }, [
    slidesToShow,
    rewind,
    slidesToScroll,
    elementRef,
    gliderRef,
    dotsRef,
    prevRef,
    nextRef,
  ])

  useEffect(() => {
    initializeGlider()
  }, [isMounted, initializeGlider])

  const handleOnAnimated = useCallback(
    (
      event: Glider.GliderEvent<{
        value: string | number
        type: 'arrow' | 'dot' | 'slide'
      }>
    ) => {
      const index = getCurrentSlide({
        event,
        slidesCount,
        prevSlide: currentSlide,
        slidesToShow,
        isLastPage,
      })

      setCurrentSlide(index)
      onSlide?.(index)
    },
    [currentSlide, slidesCount, slidesToShow, isLastPage, onSlide]
  )

  useEffect(() => {
    const element = elementRef.current

    element?.addEventListener('glider-animated', handleOnAnimated)

    return () => {
      element?.removeEventListener('glider-animated', handleOnAnimated)
    }
  }, [handleOnAnimated, elementRef])

  const { pauseInterval } = useInterval({
    callback: () => {
      if (isLastPage) {
        if (!rewind) {
          pauseInterval()
        } else {
          gliderRef.current?.scrollItem(0, false)
        }
      } else {
        gliderRef.current?.scrollItem(currentSlide + slidesToScroll, false)
      }
    },
    delay: autoplayDelay,
    isPaused,
  })

  const prevDisabled = rewind ? false : currentSlide === 0
  const nextDisabled = rewind ? false : isLastPage

  return {
    isLastPage,
    nextDisabled,
    prevDisabled,
  }
}

export default useCarousel
