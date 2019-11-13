import React, { forwardRef, ReactNode, MouseEvent, HTMLAttributes } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MUITableRow from '@material-ui/core/TableRow'

import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props
  extends StandardProps,
    HTMLAttributes<HTMLTableRowElement> {
  /** Should be valid `<tr>` children such as `Table.Cell`. */
  children: ReactNode
  /** If true, the table row will shade on hover */
  hover?: boolean
  /** If true, the table row will have the selected shading */
  selected?: boolean
  /** Callback invoked when user clicks on table row */
  onClick?: (event: MouseEvent<HTMLTableRowElement>) => void
  /** Set a strip even background for the row */
  stripEven?: boolean
}

export const TableRow = forwardRef<HTMLTableRowElement, Props>(
  function TableRow(
    {
      classes,
      className,
      style,
      children,
      hover,
      selected,
      stripEven,
      onClick,
      ...rest
    },
    ref
  ) {
    const { stripEven: stripEvenClass, ...restClasses } = classes

    return (
      <MUITableRow
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        classes={restClasses}
        className={cx(className, {
          [stripEvenClass]: stripEven
        })}
        style={style}
        hover={hover}
        selected={selected}
        onClick={onClick}
      >
        {children}
      </MUITableRow>
    )
  }
)

TableRow.defaultProps = {
  hover: false,
  selected: false,
  stripEven: false
}

TableRow.displayName = 'TableRow'

export default withStyles(styles)(TableRow)
