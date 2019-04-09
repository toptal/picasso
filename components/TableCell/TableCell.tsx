import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITableCell from '@material-ui/core/TableCell'

import { StandardProps } from '../Picasso'
import styles from './styles'

type AlignType = 'inherit' | 'left' | 'center' | 'right' | 'justify'

interface Props extends StandardProps {
  /** Set the text-align on the table cell content */
  align?: AlignType
  /** The table cell contents */
  children: ReactNode
}

export const TableCell: FunctionComponent<Props> = props => {
  const { align, classes, className, style, children } = props

  return (
    <MUITableCell
      align={align}
      classes={classes}
      className={className}
      style={style}
    >
      {children}
    </MUITableCell>
  )
}

TableCell.defaultProps = {
  align: 'inherit'
}

TableCell.displayName = 'TableCell'

export default withStyles(styles)(TableCell)
