/* eslint-disable complexity */
import {
  MuiThemeProvider,
  Theme,
  ThemeOptions,
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles'
import React, {
  FunctionComponent,
  ReactNode,
  useRef,
  useState,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes
} from 'react'
import { makeStyles } from '@material-ui/styles'
import { Helmet } from 'react-helmet'
import unsafeErrorLog from '@toptal/picasso/utils/unsafe-error-log'

import CssBaseline from '../CssBaseline'
import FontsLoader from './FontsLoader'
import NotificationsProvider from './NotificationsProvider'
import globalStyles from './styles'
import Favicon from '../Favicon'
import { EnvironmentType, TextLabelProps } from '../types'
import { generateRandomStringOrGetEmptyInTest } from './utils'
import { RootContext } from './RootContext'
import { PicassoBreakpoints } from './config'
import PicassoProvider from './PicassoProvider'

interface PicassoGlobalStylesProviderProps extends TextLabelProps {
  children?: ReactNode
  RootComponent: ForwardRefExoticComponent<
    PicassoRootNodeProps & RefAttributes<HTMLDivElement>
  >
  environment: EnvironmentType<'test' | 'temploy'>
  disableTransitions?: boolean
}

interface PicassoRootNodeProps {
  children?: ReactNode
}

const useGlobalStyles = makeStyles<Theme>(globalStyles, {
  name: 'Picasso'
})

// eslint-disable-next-line react/display-name
const PicassoRootNode = forwardRef<HTMLDivElement, PicassoRootNodeProps>(
  (props, ref) => {
    const { children } = props
    const classes = useGlobalStyles()

    return (
      <div ref={ref} className={classes.root}>
        {children}
      </div>
    )
  }
)

const PicassoGlobalStylesProvider = (
  props: PicassoGlobalStylesProviderProps
) => {
  const {
    children,
    RootComponent,
    environment,
    titleCase,
    disableTransitions
  } = props

  const rootRef = useRef<HTMLDivElement>(null)
  const [contextValue, setContextValue] = useState({
    rootRef,
    hasTopBar: false,
    setHasTopBar: (hasTopBar: boolean) => {
      setContextValue({
        ...contextValue,
        hasTopBar
      })
    },
    environment,
    titleCase,
    hasDrawer: false,
    setHasDrawer: (hasDrawer: boolean) => {
      setContextValue({
        ...contextValue,
        hasDrawer
      })
    },
    hasSidebar: false,
    setHasSidebar: (hasSidebar: boolean) => {
      setContextValue({
        ...contextValue,
        hasSidebar
      })
    },
    disableTransitions
  })

  return (
    <RootComponent ref={rootRef}>
      <RootContext.Provider value={contextValue}>
        {children}
      </RootContext.Provider>
    </RootComponent>
  )
}

const Viewport = () => {
  const [warned, setWarned] = useState(false)

  const content = 'width=device-width, user-scalable=no'
  const nonPicassoViewportTags = document.querySelectorAll(
    'meta[name="viewport"]:not([data-picasso="true"])'
  )

  if (nonPicassoViewportTags.length > 0) {
    if (!warned) {
      unsafeErrorLog(
        `PICASSO:
        I wanted to add viewport meta tag to your page but failed as it already contains ${nonPicassoViewportTags.length}.
        My viewport meta tag content is "${content}".
        The absence of this content may cause some of my features to work incorrectly.
        For example, inputs will be scaled when focused on Safari, iOS.
        Please, delete your viewport meta tag so I can insert mine.`
      )
      setWarned(true)
    }

    return null
  }

  return (
    <Helmet>
      <meta name='viewport' content={content} data-picasso='true' />
    </Helmet>
  )
}

interface PicassoProps extends TextLabelProps {
  children?: ReactNode
  /** Whether to load fonts file to the page */
  loadFonts?: boolean
  /** Whether to specify favicons in the head */
  loadFavicon?: boolean
  /** current environment */
  environment?: EnvironmentType<'test' | 'temploy'>
  /** Whether to apply Picasso CSS reset */
  reset?: boolean
  /** Sets a minimum width of the page */
  responsive?: boolean
  /** Whether to load viewport fix or not */
  fixViewport?: boolean
  /** Notification DOMNode for createPortal */
  notificationContainer?: HTMLElement
  /** Component that is used to render root node  */
  RootComponent?: PicassoGlobalStylesProviderProps['RootComponent']
  theme?: ThemeOptions
  /** Disables transitions for components like Loader, to make testing easier */
  disableTransitions?: boolean
}

const Picasso: FunctionComponent<PicassoProps> = ({
  loadFonts,
  loadFavicon,
  reset,
  responsive,
  environment = 'development',
  children,
  fixViewport,
  notificationContainer,
  RootComponent = PicassoRootNode,
  titleCase,
  theme,
  disableTransitions
}) => {
  if (theme) {
    PicassoProvider.extendTheme(theme)
  }

  if (!responsive) {
    PicassoProvider.disableResponsiveStyle()
    PicassoBreakpoints.disableMobileBreakpoints()
  }

  const generateClassName = createGenerateClassName({
    // if there are multiples instances of Picasso
    // on the page we want each set of styles to be unique
    seed: generateRandomStringOrGetEmptyInTest()
  })

  return (
    <StylesProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={PicassoProvider.theme}>
        <PicassoGlobalStylesProvider
          RootComponent={RootComponent}
          environment={environment}
          titleCase={titleCase}
          disableTransitions={disableTransitions}
        >
          {fixViewport && <Viewport />}
          {loadFonts && <FontsLoader />}
          {reset && <CssBaseline />}
          {loadFavicon && <Favicon environment={environment} />}
          <NotificationsProvider container={notificationContainer}>
            {children}
          </NotificationsProvider>
        </PicassoGlobalStylesProvider>
      </MuiThemeProvider>
    </StylesProvider>
  )
}

Picasso.defaultProps = {
  environment: 'development',
  loadFonts: true,
  loadFavicon: true,
  responsive: true,
  reset: true,
  fixViewport: true,
  RootComponent: PicassoRootNode
}

export default Picasso
