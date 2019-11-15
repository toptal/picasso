import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITableBody from '@material-ui/core/TableBody'

import TableExpandableRow from '../TableExpandableRow'
import TableRow from '../TableRow'
import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props
  extends StandardProps,
    HTMLAttributes<HTMLTableSectionElement> {
  /** The content of the component, normally `Table.Row` */
  children: ReactNode
}

const decorateRows = (children: React.ReactNode) => {
  let stripeIndex = -1

  // eslint-disable-next-line complexity
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child
    }

    const isTableRow =
      child.type === TableRow || child.type === TableExpandableRow

    if (!isTableRow) {
      return child
    }

    stripeIndex++
    if (stripeIndex % 2 !== 0) {
      return React.cloneElement(child, { stripeEven: true })
    }

    return child
  })
}

export const TableBody = forwardRef<HTMLElement, Props>(function TableBody(
  { classes, className, style, children, ...rest },
  ref
) {
  return (
    <MUITableBody
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      classes={classes}
      className={className}
      style={style}
    >
      {decorateRows(children)}
    </MUITableBody>
  )
})

TableBody.defaultProps = {}

TableBody.displayName = 'TableBody'

export default withStyles(styles)(TableBody)
