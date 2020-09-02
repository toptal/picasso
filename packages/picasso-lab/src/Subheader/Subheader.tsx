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
Subheader.Tabs = Tabs
Subheader.Main = Main
Subheader.Actions = Actions

Subheader.displayName = 'Subheader'

export default Subheader
