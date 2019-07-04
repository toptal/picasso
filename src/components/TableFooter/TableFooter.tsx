import { withStyles } from '@material-ui/core/styles'
import MUITableFooter from '@material-ui/core/TableFooter'
import React, { FunctionComponent, ReactNode, HTMLAttributes } from 'react'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps, HTMLAttributes<HTMLTableSectionElement> {
  /** Zero or more Table.Row elements. */
  children: ReactNode
}

export const TableFooter: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  children,
  ...rest
}) => (
  <MUITableFooter
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    classes={classes}
    className={className}
    style={style}
  >
    {children}
  </MUITableFooter>
)

TableFooter.defaultProps = {}

TableFooter.displayName = 'TableFooter'

export default withStyles(styles)(TableFooter)
