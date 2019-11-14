import React, {
  forwardRef,
  ReactNode,
  HTMLAttributes,
  ReactElement
} from 'react'
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

  return React.Children.map(children, child => {
    if (!child) {
      return child
    }

    const childElement = child as ReactElement
    const type = childElement.type

    // child can be string or number, but we need to decorate only TableRows
    if (!type) {
      return child
    }

    const isTableRow =
      childElement.type === TableRow || childElement.type === TableExpandableRow

    if (!isTableRow) {
      return childElement
    }

    stripeIndex++
    if (stripeIndex % 2 !== 0) {
      return React.cloneElement(childElement, { stripeEven: true })
    }

    return childElement
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
