import React, { useMemo } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'

import calculateGradientWidth from './utils/calculateGradientWidth'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, { name: 'CarouselGradient' })

type Props = {
  slidesToShow: number
  isLastPage: boolean
}

const CarouselGradient = ({ isLastPage, slidesToShow }: Props) => {
  const classes = useStyles()

  const hasGradient = !Number.isInteger(slidesToShow)

  const showNextGradient = hasGradient && !isLastPage
  const showPrevGradient = hasGradient && isLastPage

  const gradientStyle = useMemo(() => {
    if (!hasGradient) {
      return {}
    }

    return {
      width: `${calculateGradientWidth(slidesToShow)}%`,
    }
  }, [slidesToShow, hasGradient])

  if (!hasGradient) {
    return null
  }

  return (
    <div
      style={gradientStyle}
      className={cx({
        [classes.gradient]: showNextGradient || showPrevGradient,
        [classes.nextGradient]: showNextGradient,
        [classes.prevGradient]: showPrevGradient,
      })}
    />
  )
}

export default CarouselGradient
