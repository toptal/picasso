import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { DirectionType } from '../Stepper'
import { ChevronRight16 as ChevronRightIcon } from '../Icon'
import styles from './styles'

export type Props = { direction: DirectionType }

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoStepConnector'
})

export const StepConnector = ({ direction }: Props) => {
  const classes = useStyles()

  if (direction === 'vertical') {
    return <div className={classes.divider} />
  }

  return <ChevronRightIcon className={classes.connectorIcon} />
}

StepConnector.displayName = 'StepConnector'

export default StepConnector
