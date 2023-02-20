import React, { useRef, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Glider from 'react-glider'
import cx from 'classnames'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'glider-js/glider.css'
import type { GliderMethods } from 'react-glider/dist/types'

import styles from './styles'
import Section from '../Section'
import Container from '../Container'
import useOnScreen from '../utils/useOnScreen/use-on-screen'
import Navigation from './Navigation'
import useAutoplay from './hooks/useAutoplay'
import usePauseAutoplayOnHover from './hooks/usePauseAutoplayOnHover'
import useHandleOnScreen from './hooks/useHandleOnScreen'
import getCurrentSlideOnDotEvent from './utils/getCurrentSlideOnDotEvent'
import getIsOnLastSlide from './utils/getIsOnLastSlide'
import type { Props } from './types'

const useStyles = makeStyles<Theme>(styles)

export const Carousel = ({
  autoplay = true,
  autoplayDelay = 3000,
  children,
  footer,
  header,
  hideArrows,
  hideDots,
  onInView,
  onSlide,
  pauseAutoplayOnHover = true,
  responsive,
  rewind = true,
  slidesToScroll = 1,
  slidesToShow = 2,
}: Props) => {
  const classes = useStyles()

  const [currentSlide, setCurrentSlide] = useState(0)
  const gliderRef = useRef<GliderMethods & { track: HTMLDivElement }>(null)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timer>()

  const isOnScreen = useOnScreen(wrapperRef)

  const slidesCount = gliderRef.current?.track.childElementCount || 0
  const isOnLastSlide = getIsOnLastSlide({
    currentSlide,
    slidesCount,
    slidesToShow,
  })

  const [startAutoplay, stopAutoplay] = useAutoplay({
    gliderRef,
    slidesToScroll,
    intervalRef,
    autoplay,
    autoplayDelay,
    rewind,
    currentSlide,
    isOnLastSlide,
  })

  usePauseAutoplayOnHover({
    pauseAutoplayOnHover,
    startAutoplay,
    stopAutoplay,
    wrapperRef,
  })

  useHandleOnScreen({
    autoplay,
    isOnScreen,
    startAutoplay,
    stopAutoplay,
    onInView,
  })

  const handleAnimated = (event: CustomEvent) => {
    const {
      detail: { type, value },
    } = event

    if (onSlide) {
      onSlide(currentSlide, event)
    }

    if (type === 'slide') {
      setCurrentSlide(value)
    }

    if (type === 'arrow') {
      if (value === 'next') {
        setCurrentSlide(currentSlide + 1)
      }
      if (value === 'prev') {
        setCurrentSlide(currentSlide - 1)
      }
    }

    if (type === 'dot') {
      setCurrentSlide(
        getCurrentSlideOnDotEvent({
          slidesToShow,
          currentDot: value,
        })
      )
    }
  }

  return (
    <Section
      ref={wrapperRef}
      className={cx(classes.root, {
        [classes.gradient]: !Number.isInteger(slidesToShow) && !isOnLastSlide,
      })}
      variant='bordered'
    >
      {header && <Container className={classes.header}>{header}</Container>}
      <Glider
        ref={gliderRef}
        hasArrows={!hideArrows}
        hasDots={!hideDots}
        slidesToShow={slidesToShow}
        rewind={rewind}
        slidesToScroll={slidesToScroll}
        arrows={{
          prev: `.${classes.arrowPrev}`,
          next: `.${classes.arrowNext}`,
        }}
        responsive={responsive}
        dots={`.${classes.dots}`}
        onAnimated={handleAnimated}
      >
        {children}
      </Glider>

      <Navigation
        disablePrevButton={rewind ? false : currentSlide === 0}
        disableNextButton={rewind ? false : isOnLastSlide}
        hideArrows={hideArrows}
        hideDots={hideDots}
        classes={classes}
      />
      {footer && <Container className={classes.footer}>{footer}</Container>}
    </Section>
  )
}

Carousel.defaultProps = {
  hideArrows: false,
  hideDots: false,
  rewind: true,
  autoplay: true,
  autoplayDelay: 3000,
  pauseAutoplayOnHover: true,
  slidesToScroll: 1,
  slidesToShow: 2,
}

Carousel.displayName = 'Carousel'

export default Carousel
