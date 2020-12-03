import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { mergeClasses, StandardProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import Container from '../Container'
import styles from './styles'

export interface Props
  extends StandardProps,
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  children: ReactNode
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoSidebarLogo'
})

export const SidebarLogo = forwardRef<HTMLDivElement, Props>(
  function SidebarLogo(props, ref) {
    const {
      children,
      className,
      classes: externalClasses,
      style,
      ...rest
    } = props
    const { root: rootClass, ...restClasses } = mergeClasses(
      useStyles(props),
      externalClasses
    )

    return (
      <Container
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        flex
        bottom='small'
        left='medium'
        alignItems='center'
        style={style}
        classes={restClasses}
        className={cx(rootClass, className)}
      >
        {children}
      </Container>
    )
  }
)

SidebarLogo.defaultProps = {}

SidebarLogo.displayName = 'SidebarLogo'

export default SidebarLogo
