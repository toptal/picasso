import React, { ReactNode, FunctionComponent, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIPaper from '@material-ui/core/Paper'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Content of component */
  children: ReactNode
}

export const Paper: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  children,
  ...rest
}) => (
  <MUIPaper
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    classes={classes}
    className={className}
    style={style}
    elevation={1}
    square
  >
    {children}
  </MUIPaper>
)

Paper.displayName = 'Paper'

export default withStyles(styles)(Paper)
