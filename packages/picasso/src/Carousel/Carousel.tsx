import React, {
  useRef,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Glider from 'glider-js'
import cx from 'classnames'
import 'glider-js/glider.css'
import { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'
import Container from '../Container'
import useOnScreen from '../utils/useOnScreen/use-on-screen'
import ButtonCircular from '../ButtonCircular'
import ChevronRight24 from '../Icon/ChevronRight24'
import useMouseEnter from '../utils/useMouseEnter'
import { useInterval } from '../utils'
import isOnLastPage from './utils/isOnLastPage'
import getCurrentSlide from './utils/getCurrentSlide'

let autoId = 0

const generateUniqueId = (prefix: string) => `${prefix}-${autoId++}`

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
  /** Unique identifier for the Carousel */
  id?: string
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
  id,
}: Props) => {
  const classes = useStyles()

  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesCount, setSlidesCount] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const gliderRef = useRef<Glider<HTMLDivElement>>()

  const wrapperRef = useRef<HTMLDivElement>(null)
  const elementRef = useRef<HTMLDivElement>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const isOnScreen = useOnScreen({ ref: wrapperRef })
  const isMouseOver = useMouseEnter(wrapperRef)
  const isPaused = !autoplay || !isOnScreen || isMouseOver
  const isLastPage = isOnLastPage({
    currentSlide,
    slidesCount,
    slidesToShow,
  })

  useEffect(() => {
    setIsMounted(true)
  }, [setIsMounted])

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
  }, [isMounted, slidesToShow, rewind, slidesToScroll, handleOnAnimated])

  useEffect(() => {
    const element = elementRef.current

    element?.addEventListener('glider-animated', handleOnAnimated)

    return () => {
      element?.removeEventListener('glider-animated', handleOnAnimated)
    }
  }, [handleOnAnimated])

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

  return (
    <Container
      className={cx(classes.root, className)}
      ref={wrapperRef}
      data-testid={testIds.root}
    >
      <Container
        className={cx({
          [classes.gradient]: !Number.isInteger(slidesToShow) && !isLastPage,
        })}
      >
        <Container
          id={id || generateUniqueId('carousel')}
          ref={elementRef}
          data-testid={testIds.carousel}
        >
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
              disabled={rewind ? false : currentSlide === 0}
              icon={<ChevronRight24 />}
              ref={prevRef}
              variant='flat'
            />
            <ButtonCircular
              className={classes.arrowNext}
              data-testid={testIds.next}
              disabled={rewind ? false : isLastPage}
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
