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
  isPrevDisabled: boolean
  slidePrev: () => void
  slideNext: () => void
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
  isPrevDisabled,
  testIds,
  slidePrev,
  slideNext,
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
            variant='flat'
            onClick={slidePrev}
          />
          <ButtonCircular
            data-testid={testIds.next}
            disabled={isNextDisabled}
            icon={<ChevronRight24 />}
            variant='flat'
            onClick={slideNext}
          />
        </Container>
      )}
    </Container>
  )
}

export default CarouselNavigation
