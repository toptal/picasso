/* eslint-disable import/no-extraneous-dependencies */
import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import type { TextLabelProps, BaseProps } from '@toptal/picasso-shared'
import Container from '@toptal/picasso-container'
import Typography from '@toptal/picasso-typography'

import styles from './styles'

export interface Props extends BaseProps {
  /** Content */
  children?: ReactNode
  /** Whether it should have right padding */
  rightPadding?: boolean
  /** Whether it should hide bottom border */
  noBorder?: boolean
}

const useStyles = makeStyles(styles, {
  name: 'PicassoPageHead',
})

const useMainStyles = makeStyles(styles, {
  name: 'PicassoPageHeadMain',
})

const Title = ({
  titleCase,
  children,
  className,
  ...rest
}: TextLabelProps & { children: ReactNode } & BaseProps) => {
  return (
    <Typography
      variant='heading'
      size='large'
      titleCase={titleCase}
      className={className}
      {...rest}
    >
      {children}
    </Typography>
  )
}

const Tabs = ({
  children,
  className,
  ...rest
}: { children: ReactNode } & BaseProps) => {
  return (
    <Container className={className} {...rest}>
      {children}
    </Container>
  )
}

const Main = (props: { children?: ReactNode } & BaseProps) => {
  const { className, children, ...rest } = props

  const classes = useMainStyles(props)

  return (
    <Container
      flex
      justifyContent='space-between'
      alignItems='center'
      className={cx(classes.main, className)}
      {...rest}
    >
      {children}
    </Container>
  )
}

const Actions = ({
  children,
  className,
  ...rest
}: { children: ReactNode } & BaseProps) => {
  return (
    <Container flex alignItems='center' className={className} {...rest}>
      {children}
    </Container>
  )
}

export const PageHead = forwardRef<HTMLDivElement, Props>(function PageHead(
  props,
  ref
) {
  const { children, noBorder, rightPadding, className } = props
  const classes = useStyles()

  return (
    <Container
      ref={ref}
      className={cx(classes.root, className, {
        [classes.withBorder]: !noBorder,
        [classes.rightPadding]: rightPadding,
      })}
    >
      {children}
    </Container>
  )
})

PageHead.defaultProps = {
  rightPadding: false,
  noBorder: false,
}

PageHead.displayName = 'PageHead'

export default Object.assign(PageHead, {
  Title,
  Tabs,
  Main,
  Actions,
})
