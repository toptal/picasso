import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { ChevronRight16 as ChevronRightIcon } from '../Icon'
import { Classes } from '../styles/types'
import styles from './styles'

interface Props {
  classes: Classes
}

export const StepConnector: FunctionComponent<Props> = ({ classes }) => {
  return <ChevronRightIcon className={classes.connectorIcon} />
}

StepConnector.displayName = 'StepConnector'

export default withStyles(styles)(StepConnector)
