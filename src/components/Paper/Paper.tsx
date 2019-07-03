import React, { ReactNode, FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIPaper from '@material-ui/core/Paper'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  /** Content of component */
  children: ReactNode
}

export const Paper: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  children,
  elementSelector
}) => (
  <MUIPaper
    classes={classes}
    className={className}
    style={style}
    elevation={1}
    square
    data-qa={elementSelector}
  >
    {children}
  </MUIPaper>
)

Paper.displayName = 'Paper'

export default withStyles(styles)(Paper)
