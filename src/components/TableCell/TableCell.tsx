import React, { forwardRef, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITableCell from '@material-ui/core/TableCell'

import { StandardProps } from '../Picasso'
import styles from './styles'

type AlignType = 'inherit' | 'left' | 'center' | 'right' | 'justify'

export interface Props
  extends StandardProps,
    HTMLAttributes<HTMLTableCellElement> {
  /** Set the text-align on the table cell content */
  align?: AlignType
  /** Indicates for how many columns the cell extends */
  colSpan?: number
}

export const TableCell = forwardRef<HTMLTableCellElement, Props>(
  function TableCell(
    { align, classes, className, style, children, colSpan, ...rest },
    ref
  ) {
    return (
      <MUITableCell
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        align={align}
        classes={classes}
        className={className}
        style={style}
        colSpan={colSpan}
      >
        {children}
      </MUITableCell>
    )
  }
)

TableCell.defaultProps = {
  align: 'inherit'
}

TableCell.displayName = 'TableCell'

export default withStyles(styles)(TableCell)
