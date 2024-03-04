import { useRef, useCallback, useState, useEffect } from 'react'
import Glider from 'glider-js'

import isOnLastPage from '../../utils'
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
  hasDots: boolean
}

const useCarousel = ({
  autoplay,
  autoplayDelay,
  onSlide,
  rewind,
  slidesToScroll,
  slidesToShow,
  slidesCount,
  hasDots,
}: Props) => {
  const dotsRef = useRef<HTMLDivElement>(null)
  const elementRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isLastPage, setLastPage] = useState(false)
  const [isFirstPage, setFirstPage] = useState(!rewind)
  const gliderRef = useRef<Glider<HTMLDivElement>>()

  const handleOnAnimated = useCallback(() => {
    const currentSlide = gliderRef.current?.slide || 0

    setLastPage(
      isOnLastPage({
        currentSlide,
        slidesCount,
        slidesToShow,
      })
    )

    setFirstPage(currentSlide === 0)
    onSlide?.(currentSlide)
  }, [slidesCount, slidesToShow, onSlide])

  const initializeGlider = useCallback(() => {
    const element = elementRef.current

    if (
      element &&
      !gliderRef.current &&
      (!hasDots || (hasDots && dotsRef.current))
    ) {
      gliderRef.current = new Glider(element, {
        slidesToShow,
        rewind,
        slidesToScroll,
        dots: dotsRef.current,
      })

      element.addEventListener('glider-animated', handleOnAnimated)
    }
  }, [slidesToShow, rewind, slidesToScroll, handleOnAnimated, hasDots])

  useEffect(() => {
    initializeGlider()
  }, [initializeGlider])

  const slideNext = useCallback(() => {
    const glider = gliderRef.current
    const currentSlide = glider?.slide || 0
    const item = isLastPage ? 0 : currentSlide + slidesToScroll

    glider?.scrollItem(item, false)
  }, [isLastPage, slidesToScroll])

  const slidePrev = useCallback(() => {
    const glider = gliderRef.current
    const currentSlide = glider?.slide || 0
    const lastPage = slidesCount - slidesToShow
    const prevSlide = currentSlide - slidesToScroll
    const item = currentSlide === 0 ? lastPage : prevSlide

    glider?.scrollItem(item, false)
  }, [slidesCount, slidesToShow, slidesToScroll])

  useAutoplay({
    slideNext,
    rewind,
    isLastPage,
    autoplay,
    autoplayDelay,
    wrapperRef,
  })

  const getPrevProps = useCallback(
    () => ({
      disabled: rewind ? false : isFirstPage,
      onClick: slidePrev,
    }),
    [rewind, slidePrev, isFirstPage]
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

  const getCarouselProps = useCallback(
    () => ({
      ref: elementRef,
    }),
    []
  )

  const getContainerProps = useCallback(
    () => ({
      ref: wrapperRef,
    }),
    []
  )

  return {
    isLastPage,
    getPrevProps,
    getNextProps,
    getDotsProps,
    getContainerProps,
    getCarouselProps,
  }
}

export default useCarousel
