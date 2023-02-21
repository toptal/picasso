import { ReactNode } from 'react'
import { BaseProps } from '@toptal/picasso-shared'

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
