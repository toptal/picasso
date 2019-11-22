import { withStyles } from '@material-ui/core/styles'
import MUITableFooter from '@material-ui/core/TableFooter'
import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props
  extends StandardProps,
    HTMLAttributes<HTMLTableSectionElement> {
  /** Zero or more Table.Row elements. */
  children: ReactNode
}

export const TableFooter = forwardRef<HTMLElement, Props>(function TableFooter(
  { classes, className, style, children, ...rest },
  ref
) {
  return (
    <MUITableFooter
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      classes={classes}
      className={className}
      style={style}
    >
      {children}
    </MUITableFooter>
  )
})

TableFooter.defaultProps = {}

TableFooter.displayName = 'TableFooter'

export default withStyles(styles)(TableFooter)
