import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITableBody from '@material-ui/core/TableBody'

import { Classes } from '../styles/types'
import styles from './styles'

interface Props {
  classes: Classes
  /** The content of the component, normally `Table.Row` */
  children: React.ReactNode
}

export const TableBody: FunctionComponent<Props> = props => {
  const { classes, children } = props

  return <MUITableBody classes={classes}>{children}</MUITableBody>
}

TableBody.defaultProps = {}

TableBody.displayName = 'TableBody'

export default withStyles(styles)(TableBody)
