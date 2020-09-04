import React, {
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  ReactNode
} from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  CompoundedComponentWithRef,
  TextLabelProps,
  BaseProps
} from '@toptal/picasso-shared'
import { Typography, Container } from '@toptal/picasso'

import styles from './styles'

interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Content of Title */
  children?: ReactNode
  /** Whether Title should have right padding */
  topMargin?: boolean
}

interface StaticProps {
  Actions: FunctionComponent
  Content: FunctionComponent
  Description: FunctionComponent
  Main: FunctionComponent
  Title: FunctionComponent
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoSubtitle'
})

const useMainStyles = makeStyles<Theme>(styles, {
  name: 'PicassoSubtitleMain'
})

const Description: FunctionComponent = ({ children, ...rest }) => (
  <Container as='span' left={0.5}>
    <Typography
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      as='span'
      color='dark-grey'
      size='medium'
      weight='regular'
    >
      {children}
    </Typography>
  </Container>
)

const Actions: FunctionComponent = ({ children }) => (
  <Container flex alignItems='center'>
    {children}
  </Container>
)

const Content: FunctionComponent<TextLabelProps> = ({
  titleCase,
  children
}) => (
  <Typography variant='heading' size='medium' titleCase={titleCase}>
    {children}
  </Typography>
)

const Main: FunctionComponent = props => {
  const classes = useMainStyles(props)

  return (
    <Container flex justifyContent='space-between' className={classes.main}>
      {props.children}
    </Container>
  )
}

const Title: FunctionComponent<TextLabelProps> = ({
  children,
  titleCase,
  ...rest
}) => {
  return (
    <Typography
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      as='span'
      titleCase={titleCase}
      color='inherit'
      weight='semibold'
    >
      {children}
    </Typography>
  )
}

export const Subtitle = forwardRef<HTMLDivElement, Props>(function Subtitle(
  props,
  ref
) {
  const { children, style, ...rest } = props
  const classes = useStyles(props)

  return (
    <Container
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      style={style}
      className={cx(classes.root, {
        [classes.topMargin]: props.topMargin
      })}
    >
      {children}
    </Container>
  )
}) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

Subtitle.Actions = Actions
Subtitle.Content = Content
Subtitle.Description = Description
Subtitle.Title = Title
Subtitle.Main = Main

Subtitle.displayName = 'Subtitle'

export default Subtitle
