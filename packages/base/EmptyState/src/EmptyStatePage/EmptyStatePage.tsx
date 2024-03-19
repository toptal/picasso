import type { HTMLAttributes, ReactElement } from 'react'
import React, { forwardRef, cloneElement } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'

import styles from './styles'

export interface Props extends HTMLAttributes<HTMLDivElement> {
  /** Adds <Icon /> above EmptyStatePage content  */
  image: ReactElement
  /** Adds Title string below the main image */
  title?: string
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoEmptyStatePage',
})

export const EmptyStatePage = forwardRef<HTMLDivElement, Props>(
  function EmptyStatePage(props, ref) {
    const classes = useStyles()
    const { image, title, children, style, ...rest } = props

    return (
      <Container
        {...rest}
        direction='column'
        alignItems='center'
        flex
        ref={ref}
        style={style}
      >
        <Container
          alignItems='center'
          justifyContent='center'
          bottom='medium'
          flex
        >
          {cloneElement(image, { className: classes.image })}
        </Container>
        {title && (
          <Container bottom='xsmall'>
            <Typography variant='heading' size='medium'>
              {title}
            </Typography>
          </Container>
        )}
        <Typography
          size='xsmall'
          as={typeof children === 'string' ? 'p' : 'div'}
        >
          {children}
        </Typography>
      </Container>
    )
  }
)

EmptyStatePage.displayName = 'EmptyStatePage'

export default EmptyStatePage
