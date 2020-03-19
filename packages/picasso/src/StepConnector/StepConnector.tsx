import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Classes } from '@toptal/picasso-shared'

import { ChevronRight16 as ChevronRightIcon } from '../Icon'
import styles from './styles'

export interface Props {
  classes: Classes
}

export const StepConnector: FunctionComponent<Props> = ({ classes }) => {
  return <ChevronRightIcon className={classes.connectorIcon} />
}

StepConnector.displayName = 'StepConnector'

export default withStyles(styles)(StepConnector)
