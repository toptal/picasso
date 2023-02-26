import React, { useRef, ReactNode } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import 'glider-js/glider.css'
import { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'
import Container from '../Container'
import ButtonCircular from '../ButtonCircular'
import ChevronRight24 from '../Icon/ChevronRight24'
import useCarousel from './hooks/useCarousel'

const getLayout = (hasArrows: boolean, hasDots: boolean) => {
  if (hasArrows && hasDots) {
    return 'space-between'
  }

  if (hasArrows) {
    return 'flex-end'
  }

  if (hasDots) {
    return 'center'
  }
}

const useStyles = makeStyles<Theme>(styles, { name: 'Carousel' })

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
  testIds = {},
}: Props) => {
  const classes = useStyles()

  const elementRef = useRef<HTMLDivElement>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const { nextDisabled, prevDisabled, hasGradient } = useCarousel({
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
  })

  return (
    <Container
      className={cx(classes.root, className)}
      data-testid={testIds.root}
    >
      <Container
        className={cx({
          [classes.gradient]: hasGradient,
        })}
      >
        <Container ref={elementRef} data-testid={testIds.carousel}>
          {children}
        </Container>
      </Container>
      <Container
        className={classes.navigation}
        flex
        justifyContent={getLayout(hasArrows, hasDots)}
        data-testid={testIds.navigation}
      >
        {hasDots && (
          <div
            ref={dotsRef}
            data-testid={testIds.dots}
            className={classes.dots}
          />
        )}
        {hasArrows && (
          <Container className={classes.arrows} data-testid={testIds.arrows}>
            <ButtonCircular
              className={classes.arrowPrev}
              data-testid={testIds.prev}
              disabled={prevDisabled}
              icon={<ChevronRight24 />}
              ref={prevRef}
              variant='flat'
            />
            <ButtonCircular
              className={classes.arrowNext}
              data-testid={testIds.next}
              disabled={nextDisabled}
              icon={<ChevronRight24 />}
              ref={nextRef}
              variant='flat'
            />
          </Container>
        )}
      </Container>
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
