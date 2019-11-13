import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITableRow from '@material-ui/core/TableRow'

import { BaseProps } from '../Picasso'
import styles from './styles'

const useStyles = makeStyles<Theme, Props>(styles)

export interface Props extends BaseProps, HTMLAttributes<HTMLTableRowElement> {
  /** Should be valid `<tr>` children such as `Table.Cell`. */
  children: ReactNode
  /** Whether the row is in collapsed or expanded state */
  expanded?: boolean
  /** Set a strip even background for the row */
  stripEven?: boolean
}

export const TableExpandableRow = forwardRef<HTMLTableRowElement, Props>(
  function TableExpandableRow(props, ref) {
    const classes = useStyles(props)
    const { children, expanded, stripEven, className, style } = props

    if (!expanded) {
      return null
    }

    return (
      <MUITableRow
        ref={ref}
        className={cx(className, {
          [classes.stripEven]: stripEven
        })}
        style={style}
      >
        {children}
      </MUITableRow>
    )
  }
)

TableExpandableRow.defaultProps = {
  expanded: false,
  stripEven: false
}

TableExpandableRow.displayName = 'TableExpandableRow'

export default TableExpandableRow
