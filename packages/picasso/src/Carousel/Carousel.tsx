import React, { useEffect, useRef, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Glider from 'react-glider'
import cx from 'classnames'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'glider-js/glider.css'
import type { GliderMethods } from 'react-glider/dist/types'

import styles from './styles'
import Container from '../Container'
import useOnScreen from '../utils/useOnScreen/use-on-screen'
import type { Props } from './types'
import ButtonCircular from '../ButtonCircular'
import ChevronRight24 from '../Icon/ChevronRight24'
import useMouseEnter from '../utils/useMouseEnter'
import { useInterval } from '../utils'
import isOnLastPage from './utils/isOnLastPage'
import getCurrentSlide from './utils/getCurrentSlide'

const useStyles = makeStyles<Theme>(styles, { name: 'Carousel' })

export const Carousel = ({
  autoplay = false,
  autoplayDelay = 3000,
  className,
  children,
  hasArrows,
  hasDots,
  onSlide,
  rewind = false,
  slidesToScroll = 1,
  slidesToShow = 1,
  testIds = {},
}: Props) => {
  const classes = useStyles()

  const [currentSlide, setCurrentSlide] = useState(0)
  const gliderRef = useRef<GliderMethods & { track: HTMLDivElement }>(null)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)

  const isOnScreen = useOnScreen(wrapperRef)
  const isMouseOver = useMouseEnter(wrapperRef)

  const slidesCount = gliderRef.current?.track.childElementCount || 0
  const isLastPage = isOnLastPage({
    currentSlide,
    slidesCount,
    slidesToShow,
  })

  useEffect(() => {
    onSlide?.(currentSlide)
  }, [currentSlide, onSlide])

  const isPaused = !autoplay || !isOnScreen || isMouseOver

  const { pauseInterval } = useInterval({
    callback: () => {
      if (isLastPage) {
        if (!rewind) {
          pauseInterval()
        } else {
          gliderRef.current?.scrollItem(0)
        }
      } else {
        gliderRef.current?.scrollItem(currentSlide + slidesToScroll)
      }
    },
    delay: autoplayDelay,
    isPaused,
  })

  const handleOnAnimated = (event: CustomEvent) => {
    const index = getCurrentSlide({
      event,
      slidesCount,
      prevSlide: currentSlide,
      slidesToShow,
      isLastPage,
    })

    setCurrentSlide(index)
  }

  return (
    <Container
      className={cx(classes.root, className, {
        [classes.gradient]: !Number.isInteger(slidesToShow) && !isLastPage,
      })}
      ref={wrapperRef}
      data-testid={testIds.root}
    >
      <Glider
        ref={gliderRef}
        hasArrows={hasArrows}
        hasDots={hasDots}
        slidesToShow={slidesToShow}
        rewind={rewind}
        slidesToScroll={slidesToScroll}
        arrows={{
          prev: prevRef.current,
          next: nextRef.current,
        }}
        dots={dotsRef.current}
        onAnimated={handleOnAnimated}
        data-testid={testIds.carousel}
      >
        {children}
      </Glider>

      <Container
        className={classes.navigation}
        flex
        justifyContent='space-between'
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
