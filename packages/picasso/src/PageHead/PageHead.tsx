import React, { forwardRef, ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { TextLabelProps, BaseProps } from '@toptal/picasso-shared'

import Container from '../Container'
import Typography from '../Typography'
import styles from './styles'

export interface Props extends BaseProps {
  /** Content */
  children?: ReactNode
  /** Whether it should have right padding */
  rightPadding?: boolean
}

const useStyles = makeStyles(styles, {
  name: 'PicassoPageHead'
})

const useMainStyles = makeStyles(styles, {
  name: 'PicassoPageHeadMain'
})

const Title = ({
  titleCase,
  children
}: TextLabelProps & { children: ReactNode }) => {
  return (
    <Typography variant='heading' size='large' titleCase={titleCase}>
      {children}
    </Typography>
  )
}

const Tabs = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>
}

const Main = (props: { children?: ReactNode }) => {
  const classes = useMainStyles(props)

  return (
    <Container
      flex
      justifyContent='space-between'
      alignItems='center'
      className={classes.main}
    >
      {props.children}
    </Container>
  )
}

const Actions = ({ children }: { children: ReactNode }) => {
  return (
    <Container flex alignItems='center'>
      {children}
    </Container>
  )
}

export const PageHead = forwardRef<HTMLDivElement, Props>(function PageHead(
  props,
  ref
) {
  const { children } = props
  const classes = useStyles()

  return (
    <Container
      ref={ref}
      className={cx(classes.root, {
        [classes.rightPadding]: props.rightPadding
      })}
    >
      {children}
    </Container>
  )
})

PageHead.defaultProps = {
  rightPadding: false
}

PageHead.displayName = 'PageHead'

export default Object.assign(PageHead, {
  Title,
  Tabs,
  Main,
  Actions
})
