import React, { forwardRef, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'
import Container from '../Container'
import Typography from '../Typography'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Title of Helpbox */
  children: string
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoHelpboxTitle'
})

export const HelpboxTitle = forwardRef<HTMLDivElement, Props>(
  function HelpboxTitle(props, ref) {
    const { className, style, children, ...rest } = props

    const classes = useStyles()

    return (
      <Container
        // eslint-disable-next-line react/jsx-props-no-spreading
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
