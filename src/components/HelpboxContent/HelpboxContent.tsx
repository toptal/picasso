import React, { ReactNode, forwardRef, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import Typography from '../Typography'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLElement> {
  /** Rendered HTML markup */
  as?: React.ElementType<React.HTMLAttributes<HTMLElement>>
  /** Content of Helpbox */
  children: ReactNode
}

export const HelpboxContent = forwardRef<HTMLElement, Props>(
  function HelpboxContent(
    { classes, className, style, as, children, ...rest },
    ref
  ) {
    return (
      <Typography
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        as={as}
        ref={ref}
        classes={classes}
        className={className}
        style={style}
        variant='body'
        size='medium'
        color='dark-grey'
      >
        {children}
      </Typography>
    )
  }
)

HelpboxContent.defaultProps = {}

HelpboxContent.displayName = 'HelpboxContent'

export default withStyles(styles)(HelpboxContent)
