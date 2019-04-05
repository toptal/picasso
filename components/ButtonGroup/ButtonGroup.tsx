import React, { ReactNode, FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Button from '../Button'
import { withClasses } from '../styles'
import { Classes } from '../styles/types'
import styles from './styles'

interface Props {
  /** List of `Button` components which you want to render as `ButtonGroup` */
  children?: ReactNode
  classes: Classes
}

export const ButtonGroup: FunctionComponent<Props> = props => {
  const { children, classes } = props

  return <div className={classes.root}>{children}</div>
}

ButtonGroup.defaultProps = {
  children: null,
  classes: {}
}

ButtonGroup.displayName = 'ButtonGroup'

export default withStyles(styles)(
  withClasses(classes => [[Button, classes.button]])(ButtonGroup)
)
