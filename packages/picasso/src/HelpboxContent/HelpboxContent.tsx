import React, { ReactNode, forwardRef, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import Typography from '../Typography'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLElement> {
  /** Content of Helpbox */
  children: ReactNode
}

export const HelpboxContent = forwardRef<HTMLElement, Props>(
  function HelpboxContent(
    { classes, className, style, children, ...rest },
    ref
  ) {
    return (
      <Typography
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        classes={classes}
        className={className}
        style={style}
        variant='body'
        as='div'
        size='medium'
        color='black'
      >
        {children}
      </Typography>
    )
  }
)

HelpboxContent.defaultProps = {}

HelpboxContent.displayName = 'HelpboxContent'

export default withStyles(styles)(HelpboxContent)
