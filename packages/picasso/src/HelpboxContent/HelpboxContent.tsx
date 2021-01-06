import React, { ReactNode, forwardRef, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'

import Typography from '../Typography'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLElement> {
  /** Content of Helpbox */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoHelpboxContent'
})

export const HelpboxContent = forwardRef<HTMLElement, Props>(
  function HelpboxContent(props, ref) {
    const { className, style, children, ...rest } = props

    const classes = useStyles()

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

export default HelpboxContent
