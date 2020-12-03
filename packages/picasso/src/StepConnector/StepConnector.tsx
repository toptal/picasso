import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Classes, mergeClasses } from '@toptal/picasso-shared'

import { ChevronRight16 as ChevronRightIcon } from '../Icon'
import styles from './styles'

export interface Props {
  classes?: Classes
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoStepConnector'
})

export const StepConnector: FunctionComponent<Props> = props => {
  const { classes: externalClasses } = props
  const classes = mergeClasses(useStyles(props), externalClasses)

  return <ChevronRightIcon className={classes.connectorIcon} />
}

StepConnector.displayName = 'StepConnector'

export default StepConnector
