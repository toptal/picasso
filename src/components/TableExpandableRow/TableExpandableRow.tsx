import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'

const useStyles = makeStyles<Theme, Props>(styles)

export interface Props
  extends StandardProps,
    HTMLAttributes<HTMLTableRowElement> {
  /** Should be valid `<tr>` children such as `Table.Cell`. */
  children: ReactNode
  expanded?: boolean
}

export const TableExpandableRow = forwardRef<HTMLDivElement, Props>(
  function TableExpandableRow(props, ref) {
    const classes = useStyles(props)
    const { children, expanded, className, style } = props

    if (!expanded) {
      return null
    }

    return (
      <div ref={ref} className={cx(className, classes.root)} style={style}>
        {children}
      </div>
    )
  }
)

TableExpandableRow.defaultProps = {
  expanded: false
}

TableExpandableRow.displayName = 'TableExpandableRow'

export default TableExpandableRow
