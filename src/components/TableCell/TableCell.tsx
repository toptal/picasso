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
  /** Indicates for how many columns the cell extends */
  colSpan?: number
}

export const TableCell: FunctionComponent<Props> = ({
  align,
  classes,
  className,
  style,
  children,
  colSpan
}) => (
  <MUITableCell
    align={align}
    classes={classes}
    className={className}
    style={style}
    colSpan={colSpan}
  >
    {children}
  </MUITableCell>
)

TableCell.defaultProps = {
  align: 'inherit'
}

TableCell.displayName = 'TableCell'

export default withStyles(styles)(TableCell)
