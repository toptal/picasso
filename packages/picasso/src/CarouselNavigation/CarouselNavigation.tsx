/* eslint-disable import/no-extraneous-dependencies */
import React, { memo } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import ButtonCircular from '@toptal/picasso-button-circular'
import Container from '@toptal/picasso-container'
import ChevronRight24 from '@toptal/picasso-icon/-chevron-right24'

import styles from './styles'

const getJustifyContent = (hasArrows: boolean, hasDots: boolean) => {
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

const useStyles = makeStyles<Theme>(styles, { name: 'CarouselNavigation' })

type Props = {
  hasArrows: boolean
  hasDots: boolean
  getDotsProps: () => {}
  getNextProps: () => {}
  getPrevProps: () => {}
  testIds: {
    navigation?: string
    arrows?: string
    prev?: string
    next?: string
    dots?: string
  }
}

const CarouselNavigation = ({
  getDotsProps,
  getNextProps,
  getPrevProps,
  hasArrows,
  hasDots,
  testIds,
}: Props) => {
  const classes = useStyles()

  return (
    <Container
      className={classes.navigation}
      flex
      justifyContent={getJustifyContent(hasArrows, hasDots)}
      data-testid={testIds.navigation}
    >
      {hasDots && (
        <div
          {...getDotsProps()}
          data-testid={testIds.dots}
          className={classes.dots}
        />
      )}
      {hasArrows && (
        <Container data-testid={testIds.arrows}>
          <ButtonCircular
            className={classes.arrowPrev}
            data-testid={testIds.prev}
            icon={<ChevronRight24 />}
            variant='flat'
            {...getPrevProps()}
          />
          <ButtonCircular
            data-testid={testIds.next}
            icon={<ChevronRight24 />}
            variant='flat'
            {...getNextProps()}
          />
        </Container>
      )}
    </Container>
  )
}

export default memo(CarouselNavigation)
