import type { ReactNode } from 'react'
import React from 'react'
import 'glider-js/glider.css'
import type { BaseProps } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso-container'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { CarouselGradient } from '../CarouselGradient'
import useCarousel from './hooks/useCarousel'
import { CarouselNavigation } from '../CarouselNavigation'

export interface Props extends BaseProps {
  /**
   * Slide automatically to next slides
   */
  autoplay?: boolean
  /**
   * Time in ms before sliding to next slide
   */
  autoplayDelay?: number
  /**
   * Carousel items
   */
  children: ReactNode
  /**
   * If true, Carousel will scroll to the beginning/end when its respective endpoint is reached
   */
  rewind: boolean
  /**
   * Hide dots from the navigation bar
   */
  hasDots?: boolean
  /**
   * Hide arrows from the navigation bar
   */
  hasArrows?: boolean
  /**
   * The number of slides to show in container
   */
  slidesToShow?: number
  /**
   * The number of slides to scroll when arrow navigation
   * is used.
   */
  slidesToScroll?: number
  /**
   * Callback triggered when Carousel finished scrolling to a slide
   */
  onSlide?: (currentSlide: number) => void
  /**
   * data-testid passed to parts of the Carousel
   */
  testIds?: {
    arrows?: string
    carousel?: string
    dots?: string
    footer?: string
    header?: string
    navigation?: string
    next?: string
    prev?: string
    root?: string
  }
}

const testIdsDefault = {}

export const Carousel = ({
  autoplay = false,
  autoplayDelay = 3000,
  className,
  children,
  hasArrows = false,
  hasDots = false,
  onSlide,
  rewind = false,
  slidesToScroll = 1,
  slidesToShow = 1,
  testIds = testIdsDefault,
}: Props) => {
  const {
    isLastPage,
    getContainerProps,
    getCarouselProps,
    getDotsProps,
    getNextProps,
    getPrevProps,
  } = useCarousel({
    autoplay,
    autoplayDelay,
    onSlide,
    rewind,
    slidesToScroll,
    slidesToShow,
    slidesCount: React.Children.count(children),
    hasDots,
  })

  return (
    <Container
      className={twMerge('[&_.glider-slide]:min-w-[100px]', className)}
      data-testid={testIds.root}
      {...getContainerProps()}
    >
      <Container className='relative'>
        <Container {...getCarouselProps()} data-testid={testIds.carousel}>
          {children}
        </Container>
        {!Number.isInteger(slidesToShow) && (
          <CarouselGradient
            slidesToShow={slidesToShow}
            isLastPage={isLastPage}
          />
        )}
      </Container>

      <CarouselNavigation
        hasArrows={hasArrows}
        hasDots={hasDots}
        getDotsProps={getDotsProps}
        getPrevProps={getPrevProps}
        getNextProps={getNextProps}
        testIds={testIds}
      />
    </Container>
  )
}

Carousel.defaultProps = {
  hasArrows: false,
  hasDots: false,
  rewind: false,
  autoplay: false,
  autoplayDelay: 3000,
  slidesToScroll: 1,
  slidesToShow: 1,
}

Carousel.displayName = 'Carousel'

export default Carousel
