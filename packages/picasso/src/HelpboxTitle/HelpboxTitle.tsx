/* eslint-disable import/no-extraneous-dependencies */
import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps } from '@toptal/picasso-shared'
import Container from '@toptal/picasso-container'
import Typography from '@toptal/picasso-typography'

import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Title of Helpbox */
  children: string
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoHelpboxTitle',
})

export const HelpboxTitle = forwardRef<HTMLDivElement, Props>(
  function HelpboxTitle(props, ref) {
    const { className, style, children, ...rest } = props

    const classes = useStyles()

    return (
      <Container
        {...rest}
        ref={ref}
        classes={classes}
        className={className}
        style={style}
        bottom='small'
      >
        <Typography variant='heading' size='small'>
          {children}
        </Typography>
      </Container>
    )
  }
)

HelpboxTitle.defaultProps = {}

HelpboxTitle.displayName = 'HelpboxTitle'

export default HelpboxTitle
