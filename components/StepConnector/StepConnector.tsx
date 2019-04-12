import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import { Classes } from '../styles/types'
import styles from './styles'

interface Props {
  classes: Classes
}

export const StepConnector: FunctionComponent<Props> = props => {
  const { classes } = props

  return <ChevronRightIcon className={classes.connectorIcon} />
}

StepConnector.displayName = 'StepConnector'

export default withStyles(styles)(StepConnector)
