import type { HTMLAttributes, ReactElement } from 'react'
import React, { forwardRef, cloneElement } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

import Container from '../Container'
import { SPACING_4, SPACING_2 } from '../utils'
import Typography from '../Typography'
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
          bottom={SPACING_4}
          flex
        >
          {cloneElement(image, { className: classes.image })}
        </Container>
        {title && (
          <Container bottom={SPACING_2}>
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
