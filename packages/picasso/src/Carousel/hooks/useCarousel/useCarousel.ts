import { useState, useRef, useCallback } from 'react'
import Glider from 'glider-js'

import isOnLastPage from '../../utils/isOnLastPage'
import getCurrentSlide from '../../utils/getCurrentSlide'
import useOnSecondRender from '../../../utils/useOnSecondRender'
import useOnGliderAnimated from '../useOnGliderAnimated'
import useAutoplay from '../useAutoplay'

type Props = {
  autoplay: boolean
  autoplayDelay: number
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
  slidesCount: number
}

type OnAnimatedEvent = Glider.GliderEvent<{
  value: string | number
  type: 'arrow' | 'dot' | 'slide'
}>

const useCarousel = ({
  autoplay,
  autoplayDelay,
  onSlide,
  rewind,
  slidesToScroll,
  slidesToShow,
  slidesCount,
}: Props) => {
  const dotsRef = useRef<HTMLDivElement>(null)
  const elementRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const gliderRef = useRef<Glider<HTMLDivElement>>()

  const isLastPage = isOnLastPage({
    currentSlide,
    slidesCount,
    slidesToShow,
  })

  const initializeGlider = useCallback(() => {
    const element = elementRef.current

    if (element && !gliderRef.current) {
      gliderRef.current = new Glider(element, {
        slidesToShow,
        rewind,
        slidesToScroll,
        dots: dotsRef.current,
      })
    }
  }, [slidesToShow, rewind, slidesToScroll, elementRef, dotsRef])

  useOnSecondRender(initializeGlider)

  const handleOnAnimated = useCallback(
    (event: OnAnimatedEvent) => {
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

  useOnGliderAnimated({ callback: handleOnAnimated, elementRef })

  const slideNext = useCallback(() => {
    const glider = gliderRef.current

    if (isLastPage) {
      glider?.scrollItem(0, false)
    } else {
      glider?.scrollItem(currentSlide + slidesToScroll, false)
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

  useAutoplay({
    slideNext,
    rewind,
    isLastPage,
    autoplay,
    autoplayDelay,
    elementRef,
  })

  const getPrevProps = useCallback(
    () => ({
      disabled: rewind ? false : currentSlide === 0,
      onClick: slidePrev,
    }),
    [currentSlide, rewind, slidePrev]
  )

  const getNextProps = useCallback(
    () => ({
      disabled: rewind ? false : isLastPage,
      onClick: slideNext,
    }),
    [isLastPage, rewind, slideNext]
  )

  const getDotsProps = useCallback(
    () => ({
      ref: dotsRef,
    }),
    []
  )

  const getContainerProps = useCallback(
    () => ({
      ref: elementRef,
    }),
    []
  )

  return {
    isLastPage,
    getPrevProps,
    getNextProps,
    getDotsProps,
    getContainerProps,
  }
}

export default useCarousel
