import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUITableBody from '@material-ui/core/TableBody'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  /** The content of the component, normally `Table.Row` */
  children: ReactNode
}

export const TableBody: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  children,
  elementSelector
}) => (
  <MUITableBody
    classes={classes}
    className={className}
    style={style}
    data-qa={elementSelector}
  >
    {children}
  </MUITableBody>
)

TableBody.defaultProps = {}

TableBody.displayName = 'TableBody'

export default withStyles(styles)(TableBody)
