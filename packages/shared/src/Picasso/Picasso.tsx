/* eslint-disable complexity */
import {
  createMuiTheme,
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
  RefObject,
  useContext,
  useState,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes
} from 'react'
import { makeStyles } from '@material-ui/styles'
import { Helmet } from 'react-helmet'

import CssBaseline from '../CssBaseline'
import {
  palette,
  layout,
  breakpoints,
  screens,
  transitions,
  typography,
  sizes,
  shadows,
  PicassoBreakpoints
} from './config'
import FontsLoader from './FontsLoader'
import Provider from './PicassoProvider'
import NotificationsProvider from './NotificationsProvider'
import globalStyles from './styles'
import Favicon from '../Favicon'
import { generateRandomStringOrGetEmptyInTest } from './utils'
import { EnvironmentType, TextLabelProps } from './types'

const picasso = {
  palette,
  layout,
  transitions,
  sizes,
  breakpoints,
  screens,
  shadows,
  typography,
  props: {
    MuiButtonBase: {
      disableRipple: true
    },
    MuiList: {
      disablePadding: true
    },
    MuiPaper: {
      square: true
    },
    MuiOutlinedInput: {
      notched: false
    }
  }
}

const PicassoProvider = new Provider(createMuiTheme(picasso))

interface RootContextProps extends TextLabelProps {
  rootRef?: RefObject<HTMLDivElement>
  hasPageHeader: boolean
  setHasPageHeader: (value: boolean) => void
  environment: EnvironmentType<'test' | 'temploy'>
  hasDrawer: boolean
  setHasDrawer: (value: boolean) => void
}
export const RootContext = React.createContext<RootContextProps>({
  hasPageHeader: false,
  setHasPageHeader: () => {},
  environment: 'development',
  titleCase: false,
  hasDrawer: false,
  setHasDrawer: () => {}
})

export const usePicassoRoot = () => {
  const context = useContext(RootContext)

  return context && context.rootRef ? context.rootRef.current : null
}

export const usePageHeader = () => {
  const context = useContext(RootContext)

  return {
    hasPageHeader: context.hasPageHeader,
    setHasPageHeader: context.setHasPageHeader
  }
}

export const useDrawer = () => {
  const context = useContext(RootContext)

  return {
    hasDrawer: context.hasDrawer,
    setHasDrawer: context.setHasDrawer
  }
}

export const useAppConfig = () => {
  const context = useContext(RootContext)

  return {
    environment: context.environment,
    titleCase: context.titleCase
  }
}

interface PicassoGlobalStylesProviderProps extends TextLabelProps {
  children?: ReactNode
  RootComponent: ForwardRefExoticComponent<
    PicassoRootNodeProps & RefAttributes<HTMLDivElement>
  >
  environment: EnvironmentType<'test' | 'temploy'>
}

interface PicassoRootNodeProps {
  children?: ReactNode
}

const useGlobalStyles = makeStyles<Theme, PicassoRootNodeProps>(globalStyles, {
  name: 'Picasso'
})

// eslint-disable-next-line react/display-name
const PicassoRootNode = forwardRef<HTMLDivElement, PicassoRootNodeProps>(
  (props, ref) => {
    const { children } = props
    const classes = useGlobalStyles(props)

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
  const { children, RootComponent, environment, titleCase } = props

  const rootRef = useRef<HTMLDivElement>(null)
  const [contextValue, setContextValue] = useState({
    rootRef,
    hasPageHeader: false,
    setHasPageHeader: (hasPageHeader: boolean) => {
      setContextValue({
        ...contextValue,
        hasPageHeader
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
    }
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
      console.warn(
        'PICASSO:',
        `I wanted to add viewport meta tag to your page but failed as it already containes ${nonPicassoViewportTags.length}.`,
        `My viewport meta tag content is "${content}".`,
        'The absence of this content may cause some of my features to work incorrectly.',
        'For example, inputs will be scaled when focused on Safari, iOS.',
        'Please, delete your viewport meta tag so I can insert mine.'
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
}

const Picasso: FunctionComponent<PicassoProps> = ({
  loadFonts,
  loadFavicon,
  reset,
  responsive,
  environment,
  children,
  fixViewport,
  notificationContainer,
  RootComponent,
  titleCase,
  theme
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
          RootComponent={RootComponent!}
          environment={environment!}
          titleCase={titleCase}
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

export { PicassoProvider }
export default Picasso
