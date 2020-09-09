import React, { forwardRef, FunctionComponent } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  CompoundedComponentWithRef,
  TextLabelProps,
  BaseProps
} from '@toptal/picasso-shared'
import { Typography, Container } from '@toptal/picasso'

import styles from './styles'

export interface Props extends BaseProps {
  /** Content of Subheader */
  children?: React.ReactNode
  /** Whether Subheader should have right padding */
  rightPadding?: boolean
}

export interface StaticProps {
  Title: FunctionComponent
  Breadcrumb: FunctionComponent
  Tabs: FunctionComponent
  Main: FunctionComponent
  Actions: FunctionComponent
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoSubheader'
})

const useMainStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSubheaderMain'
})

const Title: FunctionComponent<TextLabelProps> = ({ titleCase, children }) => (
  <Typography variant='heading' size='large' titleCase={titleCase}>
    {children}
  </Typography>
)

// Temporary implementation, to be replaced with real Breadcrumb component when ready
const Breadcrumb: FunctionComponent = () => (
  <Container top='small'>
    <span
      style={{ fontSize: '14px', fontWeight: 600, color: 'rgb(32, 78, 207)' }}
    >
      Label &nbsp; {'>'} &nbsp; Label &nbsp; {'>'} &nbsp; Label
    </span>
  </Container>
)

const Tabs: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
)

const Main: FunctionComponent = props => {
  const classes = useMainStyles(props)
  return (
    <Container flex justifyContent='space-between' className={classes.main}>
      {props.children}
    </Container>
  )
}

const Actions: FunctionComponent = ({ children }) => (
  <Container flex alignItems='center'>
    {children}
  </Container>
)

export const Subheader = forwardRef<HTMLDivElement, Props>(function Subheader(
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

Subheader.defaultProps = {
  rightPadding: false
}

Subheader.Title = Title
Subheader.Breadcrumb = Breadcrumb
Subheader.Tabs = Tabs
Subheader.Main = Main
Subheader.Actions = Actions

Subheader.displayName = 'Subheader'

export default Subheader
