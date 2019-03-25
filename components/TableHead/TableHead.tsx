import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITableHead from '@material-ui/core/TableHead'

import { Classes } from '../styles/types'
import styles from './styles'

interface Props {
  classes: Classes
  /** The content of the component, normally `Table.Row` */
  children: React.ReactNode
}

export const TableHead: FunctionComponent<Props> = props => {
  const { classes, children } = props

  return <MUITableHead classes={classes}>{children}</MUITableHead>
}

TableHead.defaultProps = {}

TableHead.displayName = 'TableHead'

export default withStyles(styles)(TableHead)
