import { Container, Typography } from '@toptal/picasso'
import React, {
  forwardRef,
  HTMLAttributes,
  ReactElement,
  cloneElement
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import styles from './styles'

export interface Props extends HTMLAttributes<HTMLDivElement> {
  /** Adds <Icon /> above EmptyStatePage content  */
  image: ReactElement
  /** Adds Title string below the main image */
  title?: string
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoEmptyStatePage'
})

export const EmptyStatePage = forwardRef<HTMLDivElement, Props>(
  function EmptyStatePage(props, ref) {
    const classes = useStyles(props)
    const { image, title, children, style, ...rest } = props

    return (
      <Container
        // eslint-disable-next-line react/jsx-props-no-spreading
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
          bottom='small'
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
          size='small'
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
