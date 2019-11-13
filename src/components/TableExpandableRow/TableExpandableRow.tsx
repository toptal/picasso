import React, { forwardRef, ReactNode, HTMLAttributes, Fragment } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITableRow from '@material-ui/core/TableRow'

import TableRow from '../TableRow/'
import { BaseProps } from '../Picasso'
import styles from './styles'

const useStyles = makeStyles<Theme, Props>(styles)

export interface Props extends BaseProps, HTMLAttributes<HTMLTableRowElement> {
  /** Should be valid `<tr>` children such as `Table.Cell`. */
  children: ReactNode
  /** Collapsible content of `TableExpandableRow` */
  content: ReactNode
  /** Whether the row is in collapsed or expanded state */
  expanded?: boolean
  /** Set a strip even background for the row */
  stripEven?: boolean
}

export const TableExpandableRow = forwardRef<HTMLTableRowElement, Props>(
  function TableExpandableRow(props, ref) {
    const classes = useStyles(props)
    const {
      children,
      content,
      expanded,
      stripEven,
      className,
      style,
      ...rest
    } = props

    const row = (
      <TableRow
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        className={className}
        style={style}
        stripEven={stripEven}
      >
        {children}
      </TableRow>
    )

    return (
      <Fragment>
        {row}
        {expanded && (
          <MUITableRow
            ref={ref}
            className={cx(className, {
              [classes.stripEven]: stripEven
            })}
            style={style}
          >
            {content}
          </MUITableRow>
        )}
      </Fragment>
    )
  }
)

TableExpandableRow.defaultProps = {
  expanded: false,
  stripEven: false
}

TableExpandableRow.displayName = 'TableExpandableRow'

export default TableExpandableRow
