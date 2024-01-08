import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import { Typography } from '@toptal/picasso-typography'

import styles from './styles'

type ContentWidth = 'shrink' | 'full'
export interface Props extends BaseProps, HTMLAttributes<HTMLElement> {
  /** Content of Helpbox */
  children: ReactNode
  /**
   * Width of the content. If set to `shrink` - the max-width of the content is 640px
   * @default full
   */
  width?: ContentWidth
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoHelpboxContent',
})

export const HelpboxContent = forwardRef<HTMLElement, Props>(
  function HelpboxContent(props, ref) {
    const { width, className, style, children, ...rest } = props

    const classes = useStyles()

    return (
      <Typography
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
  width: 'full',
}

HelpboxContent.displayName = 'HelpboxContent'

export default HelpboxContent
