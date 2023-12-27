/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

import gradientWidth from './utils/gradient-width'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, { name: 'CarouselGradient' })

type Props = {
  slidesToShow: number
  isLastPage: boolean
}

const CarouselGradient = ({ isLastPage, slidesToShow }: Props) => {
  const classes = useStyles()

  const showNextGradient = !isLastPage
  const showPrevGradient = isLastPage

  const gradientStyle = useMemo(() => {
    return {
      width: gradientWidth(slidesToShow),
    }
  }, [slidesToShow])

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

export default React.memo(CarouselGradient)
