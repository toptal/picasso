import React, { forwardRef, FunctionComponent, ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  CompoundedComponentWithRef,
  TextLabelProps,
  BaseProps
} from '@toptal/picasso-shared'
import { Typography, Container } from '@toptal/picasso'

import styles from './styles'

export interface Props extends BaseProps {
  /** Content */
  children?: ReactNode
  /** Whether it should have right padding */
  rightPadding?: boolean
}

export interface StaticProps {
  Title: FunctionComponent
  Tabs: FunctionComponent
  Main: FunctionComponent
  Actions: FunctionComponent
}

const useStyles = makeStyles(styles, {
  name: 'PicassoPageHead'
})

const useMainStyles = makeStyles(styles, {
  name: 'PicassoPageHeadMain'
})

const Title: FunctionComponent<TextLabelProps> = ({ titleCase, children }) => (
  <Typography variant='heading' size='large' titleCase={titleCase}>
    {children}
  </Typography>
)

const Tabs: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
)

const Main: FunctionComponent = props => {
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

const Actions: FunctionComponent = ({ children }) => (
  <Container flex alignItems='center'>
    {children}
  </Container>
)

export const PageHead = forwardRef<HTMLDivElement, Props>(function PageHead(
  props,
  ref
) {
  const { children } = props
  const classes = useStyles(props)

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
}) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

PageHead.defaultProps = {
  rightPadding: false
}

PageHead.Title = Title
PageHead.Tabs = Tabs
PageHead.Main = Main
PageHead.Actions = Actions

PageHead.displayName = 'PageHead'

export default PageHead
