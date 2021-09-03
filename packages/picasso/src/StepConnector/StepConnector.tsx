import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { OrientationType } from '../Stepper'
import { ChevronRight16 as ChevronRightIcon } from '../Icon'
import styles from './styles'

export type Props = { orientation: OrientationType }

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoStepConnector'
})

export const StepConnector: FunctionComponent<Props> = ({ orientation }) => {
  const classes = useStyles()

  if (orientation === 'vertical') {
    return <div className={classes.divider} />
  }

  return <ChevronRightIcon className={classes.connectorIcon} />
}

StepConnector.displayName = 'StepConnector'

export default StepConnector
