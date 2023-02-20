import React, { useEffect, useRef, useState } from 'react'
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
import useAutoplay from './hooks/useAutoplay'
import usePauseAutoplayOnHover from './hooks/usePauseAutoplayOnHover'
import useHandleOnScreen from './hooks/useHandleOnScreen'
import getCurrentSlideOnDotEvent from './utils/getCurrentSlideOnDotEvent'
import getIsOnLastSlide from './utils/getIsOnLastSlide'
import type { Props } from './types'
import ButtonCircular from '../ButtonCircular'
import { ChevronRight24 } from '../Icon'

const useStyles = makeStyles<Theme>(styles, { name: 'Carousel' })

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
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timer>()

  const isOnScreen = useOnScreen(wrapperRef)

  const slidesCount = gliderRef.current?.track.childElementCount || 0
  const isOnLastSlide = getIsOnLastSlide({
    currentSlide,
    slidesCount,
    slidesToShow,
  })

  useEffect(() => {
    if (onSlide) {
      onSlide(currentSlide)
    }
  }, [currentSlide, onSlide])

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
          prev: prevRef.current,
          next: nextRef.current,
        }}
        responsive={responsive}
        dots={dotsRef.current}
        onAnimated={handleAnimated}
      >
        {children}
      </Glider>

      <Container
        className={classes.navigation}
        flex
        justifyContent='space-between'
      >
        {!hideDots && <div ref={dotsRef} className={classes.dots} />}
        {!hideArrows && (
          <Container className={classes.arrows}>
            <ButtonCircular
              variant='flat'
              className={classes.arrowPrev}
              icon={<ChevronRight24 />}
              disabled={rewind ? false : currentSlide === 0}
              ref={prevRef}
            />
            <ButtonCircular
              variant='flat'
              className={classes.arrowNext}
              icon={<ChevronRight24 />}
              disabled={rewind ? false : isOnLastSlide}
              ref={nextRef}
            />
          </Container>
        )}
      </Container>
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
