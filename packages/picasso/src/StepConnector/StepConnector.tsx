import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { ChevronRight16 as ChevronRightIcon } from '../Icon'
import styles from './styles'

export interface Props {}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoStepConnector'
})

export const StepConnector: FunctionComponent<Props> = () => {
  const classes = useStyles()

  return <ChevronRightIcon className={classes.connectorIcon} />
}

StepConnector.displayName = 'StepConnector'

export default StepConnector
