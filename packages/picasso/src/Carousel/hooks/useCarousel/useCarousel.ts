import React, { useState, useRef, useCallback, useEffect } from 'react'
import Glider from 'glider-js'

import isOnLastPage from '../../utils/isOnLastPage'
import getCurrentSlide from '../../utils/getCurrentSlide'

type Props = {
  dotsRef: React.RefObject<HTMLDivElement>
  elementRef: React.RefObject<HTMLDivElement>
  /**
   * Callback triggered when Carousel finished scrolling to a slide
   */
  onSlide?: (currentSlide: number) => void
  /**
   * If true, Carousel will scroll to the beginning/end when its respective endpoint is reached
   */
  rewind: boolean
  /**
   * The number of slides to scroll when arrow navigation
   * is used.
   */
  slidesToScroll: number
  /**
   * The number of slides to show in container
   */
  slidesToShow: number
}

const useCarousel = ({
  dotsRef,
  elementRef,
  onSlide,
  rewind,
  slidesToScroll,
  slidesToShow,
}: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesCount, setSlidesCount] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const gliderRef = useRef<Glider<HTMLDivElement>>()

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
      })

      setSlidesCount(gliderRef.current.track.childElementCount)
    }
  }, [slidesToShow, rewind, slidesToScroll, elementRef, dotsRef])

  useEffect(() => {
    if (isMounted) {
      initializeGlider()
    }
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

  const slideNext = useCallback(() => {
    const glider = gliderRef.current
    const nextSlide = currentSlide + slidesToScroll

    if (isLastPage) {
      glider?.scrollItem(0, false)
    } else {
      glider?.scrollItem(nextSlide, false)
    }
  }, [currentSlide, isLastPage, slidesToScroll])

  const slidePrev = useCallback(() => {
    const glider = gliderRef.current
    const lastPage = slidesCount - slidesToShow
    const prevSlide = currentSlide - slidesToScroll

    if (currentSlide === 0) {
      glider?.scrollItem(lastPage, false)
    } else {
      glider?.scrollItem(prevSlide, false)
    }
  }, [currentSlide, slidesCount, slidesToShow, slidesToScroll])

  const isPrevDisabled = rewind ? false : currentSlide === 0
  const isNextDisabled = rewind ? false : isLastPage

  return {
    isLastPage,
    isNextDisabled,
    isPrevDisabled,
    slideNext,
    slidePrev,
  }
}

export default useCarousel
