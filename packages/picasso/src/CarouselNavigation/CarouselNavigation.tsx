import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import styles from './styles'
import ButtonCircular from '../ButtonCircular'
import Container from '../Container'
import ChevronRight24 from '../Icon/ChevronRight24'

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

const useStyles = makeStyles<Theme>(styles, { name: 'CarouselNavigation' })

type Props = {
  dotsRef: React.RefObject<HTMLDivElement>
  hasArrows: boolean
  hasDots: boolean
  isNextDisabled: boolean
  nextRef: React.RefObject<HTMLButtonElement>
  isPrevDisabled: boolean
  prevRef: React.RefObject<HTMLButtonElement>
  testIds: {
    navigation?: string
    arrows?: string
    prev?: string
    next?: string
    dots?: string
  }
}

const CarouselNavigation = ({
  dotsRef,
  hasArrows,
  hasDots,
  isNextDisabled,
  nextRef,
  isPrevDisabled,
  prevRef,
  testIds,
}: Props) => {
  const classes = useStyles()

  return (
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
        <Container data-testid={testIds.arrows}>
          <ButtonCircular
            className={classes.arrowPrev}
            data-testid={testIds.prev}
            disabled={isPrevDisabled}
            icon={<ChevronRight24 />}
            ref={prevRef}
            variant='flat'
          />
          <ButtonCircular
            data-testid={testIds.next}
            disabled={isNextDisabled}
            icon={<ChevronRight24 />}
            ref={nextRef}
            variant='flat'
          />
        </Container>
      )}
    </Container>
  )
}

export default CarouselNavigation
