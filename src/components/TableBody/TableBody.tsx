import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITableBody from '@material-ui/core/TableBody'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps, HTMLAttributes<HTMLTableSectionElement> {
  /** The content of the component, normally `Table.Row` */
  children: ReactNode
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
      {children}
    </MUITableBody>
  )
})

TableBody.defaultProps = {}

TableBody.displayName = 'TableBody'

export default withStyles(styles)(TableBody)
