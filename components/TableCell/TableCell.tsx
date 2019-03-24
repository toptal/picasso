import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITableCell from '@material-ui/core/TableCell'

import { Classes } from '../styles/types'
import styles from './styles'

type AlignType = 'inherit' | 'left' | 'center' | 'right' | 'justify'

interface Props {
  /** Set the text-align on the table cell content */
  align?: AlignType
  classes: Classes
  /** The table cell contents */
  children: React.ReactNode
}

export const TableCell: FunctionComponent<Props> = props => {
  const { align, classes, children } = props

  return (
    <MUITableCell align={align} classes={classes}>
      {children}
    </MUITableCell>
  )
}

TableCell.defaultProps = {
  align: 'inherit'
}

TableCell.displayName = 'TableCell'

export default withStyles(styles)(TableCell)
