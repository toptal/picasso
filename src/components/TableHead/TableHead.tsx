import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITableHead from '@material-ui/core/TableHead'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps, HTMLAttributes<HTMLTableSectionElement> {
  /** The content of the component, normally `Table.Row` */
  children: ReactNode
}

export const TableHead = forwardRef<HTMLElement, Props>(function TableHead(
  { classes, className, style, children, ...rest },
  ref
) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MUITableHead
      {...rest}
      ref={ref}
      classes={classes}
      className={className}
      style={style}
    >
      {children}
    </MUITableHead>
  )
})

TableHead.defaultProps = {}

TableHead.displayName = 'TableHead'

export default withStyles(styles)(TableHead)
