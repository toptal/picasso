import { ReactNode } from 'react'
import { BaseProps } from '@toptal/picasso-shared'

export interface BreakPoint {
  breakpoint: number
  settings: {
    slidesToShow?: number
    slidesToScroll?: number
  }
}

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
   * Pause autoplay on hover
   */
  pauseAutoplayOnHover?: boolean
  /**
   * Carousel items
   */
  children: ReactNode
  /**
   * If true, Carousel will scroll to the beginning/end when its respective endpoint is reached
   */
  rewind: boolean
  /**
   * Any content that should be rendered above the carousel
   */
  header?: ReactNode
  /**
   * Any content taht should be rendered below the carousel
   */
  footer?: ReactNode
  /**
   * Hide dots from the navigation bar
   */
  hideDots?: boolean
  /**
   * Hide arrows from the navigation bar
   */
  hideArrows?: boolean
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
   * An object containing custom settings per provided breakpoint.
   * Glider.js breakpoints are mobile-first
   * be conscious of your ordering,
   */
  responsive?: BreakPoint[]
  /**
   * Callback triggered when carousel is visible on screen
   */
  onInView?: (isInView: boolean) => void
  /**
   * Callback triggered when Carousel finished scrolling to a slide
   */
  onSlide?: (currentSlide: number) => void
}
