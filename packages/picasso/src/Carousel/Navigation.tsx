import React from 'react'
import type { ClassNameMap } from '@material-ui/core/styles/withStyles'

import Container from '../Container'
import ButtonCircular from '../ButtonCircular'
import { ChevronRight24 } from '../Icon'

type NavigationProps = {
  hideDots?: boolean
  hideArrows?: boolean
  loop?: boolean
  classes: ClassNameMap<string>
  disablePrevButton: boolean
  disableNextButton: boolean
}

const Navigation = ({
  hideDots,
  hideArrows,
  disablePrevButton,
  disableNextButton,
  classes,
}: NavigationProps) => {
  if (hideDots && hideArrows) {
    return null
  }

  return (
    <Container
      className={classes.navigation}
      flex
      justifyContent='space-between'
    >
      {!hideDots && <div className={classes.dots} />}
      {!hideArrows && (
        <Container className={classes.arrows}>
          <ButtonCircular
            variant='flat'
            className={classes.arrowPrev}
            icon={<ChevronRight24 />}
            disabled={disablePrevButton}
          />
          <ButtonCircular
            variant='flat'
            className={classes.arrowNext}
            icon={<ChevronRight24 />}
            disabled={disableNextButton}
          />
        </Container>
      )}
    </Container>
  )
}

export default Navigation
