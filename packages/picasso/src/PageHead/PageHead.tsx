import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import type { TextLabelProps, BaseProps } from '@toptal/picasso-shared'

import Container from '../Container'
import Typography from '../Typography'
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
}: TextLabelProps & { children: ReactNode } & BaseProps) => {
  return (
    <Typography
      variant='heading'
      size='large'
      titleCase={titleCase}
      className={className}
    >
      {children}
    </Typography>
  )
}

const Tabs = ({ children, className }: { children: ReactNode } & BaseProps) => {
  return <Container className={className}>{children}</Container>
}

const Main = (props: { children?: ReactNode } & BaseProps) => {
  const classes = useMainStyles(props)

  return (
    <Container
      flex
      justifyContent='space-between'
      alignItems='center'
      className={cx(classes.main, props.className)}
    >
      {props.children}
    </Container>
  )
}

const Actions = ({
  children,
  className,
}: { children: ReactNode } & BaseProps) => {
  return (
    <Container flex alignItems='center' className={className}>
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
