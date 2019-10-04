import MUIPaper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'

import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Content of component */
  elevation?: number
  children: ReactNode
}

export const Paper = forwardRef<HTMLDivElement, Props>(function Paper(
  { classes, className, style, elevation, children, ...rest },
  ref
) {
  return (
    <MUIPaper
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      classes={classes}
      className={className}
      style={style}
      elevation={elevation}
      square
    >
      {children}
    </MUIPaper>
  )
})

Paper.defaultProps = {
  elevation: 1
}

Paper.displayName = 'Paper'

export default withStyles(styles)(Paper)
