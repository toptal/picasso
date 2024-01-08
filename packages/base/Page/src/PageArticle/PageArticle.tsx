import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import type { BaseProps, OverridableComponent } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso-container'

import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Custom components that render content of page */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoPageArticle',
})

export const PageArticle: OverridableComponent<Props> = forwardRef<
  HTMLDivElement,
  Props
>(function PageArticle(props, ref) {
  const { children, className, style, ...rest } = props
  const classes = useStyles()

  return (
    <Container
      {...rest}
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
    >
      {children}
    </Container>
  )
})

PageArticle.defaultProps = {}

PageArticle.displayName = 'PageArticle'

export default PageArticle
