import React, { ReactNode, forwardRef, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import Typography from '../Typography'
import styles from './styles'

type ContentWidth = 'shrink' | 'full'
export interface Props extends StandardProps, HTMLAttributes<HTMLElement> {
  /** Content of Helpbox */
  children: ReactNode
  /**
   * Width of the content. If set to `shrink` - the max-width of the content is 640px
   * @default full
   */
  width?: ContentWidth
}

export const HelpboxContent = forwardRef<HTMLElement, Props>(
  function HelpboxContent(
    { width, classes, className, style, children, ...rest },
    ref
  ) {
    return (
      <Typography
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={cx({ [classes.shrinkWidth]: width === 'shrink' }, className)}
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

HelpboxContent.defaultProps = {
  width: 'full'
}

HelpboxContent.displayName = 'HelpboxContent'

export default withStyles(styles)(HelpboxContent)
