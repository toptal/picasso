import {
  createMuiTheme,
  MuiThemeProvider,
  Theme
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
import { ModalProvider } from 'react-modal-hook'
import { makeStyles } from '@material-ui/styles'
import { Helmet } from 'react-helmet'

import CssBaseline from '../CssBaseline'
import {
  palette,
  layout,
  transitions,
  typography,
  sizes,
  breakpoints,
  screens,
  shadows
} from './config'
import FontsLoader from './FontsLoader'
import Provider from './PicassoProvider'
import NotificationsProvider from './NotificationsProvider'
import globalStyles from './styles'
import Favicon from '../Favicon'

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

interface RootContextProps {
  rootRef?: RefObject<HTMLDivElement>
  hasPageHeader: boolean
  setHasPageHeader: (value: boolean) => void
}
const RootContext = React.createContext<RootContextProps>({
  hasPageHeader: false,
  setHasPageHeader: () => {}
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

interface PicassoGlobalStylesProviderProps {
  children?: ReactNode
  RootComponent: ForwardRefExoticComponent<
    PicassoRootNodeProps & RefAttributes<HTMLDivElement>
  >
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
  const { children, RootComponent } = props

  const rootRef = useRef<HTMLDivElement>(null)
  const [contextValue, setContextValue] = useState({
    rootRef,
    hasPageHeader: false,
    setHasPageHeader: (hasPageHeader: boolean) => {
      setContextValue({
        ...contextValue,
        hasPageHeader
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

const MetaTags = () => {
  React.useLayoutEffect(() => {
    let redundantMetaTags = document.querySelectorAll(
      'meta[name="viewport"]:not([data-react-helmet="true"])'
    )

    redundantMetaTags.forEach(metaTag => metaTag.remove())

    if (window.parent) {
      redundantMetaTags = window.parent.document.querySelectorAll(
        'meta[name="viewport"]:not([data-react-helmet="true"])'
      )

      redundantMetaTags.forEach(metaTag => metaTag.remove())
    }
  })
  return (
    <Helmet>
      <meta name='viewport' content='width=device-width, user-scalable=no' />
    </Helmet>
  )
}

interface PicassoProps {
  children?: ReactNode
  /** Whether to load fonts file to the page */
  loadFonts?: boolean
  /** Whether to specify favicons in the head */
  loadFavicon?: boolean
  /** Whether to apply Picasso CSS reset */
  reset?: boolean
  /** Notification DOMNode for createPortal */
  notificationContainer?: HTMLElement
  /** Component that is used to render root node  */
  RootComponent?: PicassoGlobalStylesProviderProps['RootComponent']
}

const Picasso: FunctionComponent<PicassoProps> = ({
  loadFonts,
  loadFavicon,
  reset,
  children,
  notificationContainer,
  RootComponent
}) => (
  <MuiThemeProvider theme={PicassoProvider.theme}>
    <MetaTags />
    {loadFonts && <FontsLoader />}
    {reset && <CssBaseline />}
    {loadFavicon && <Favicon />}
    <PicassoGlobalStylesProvider RootComponent={RootComponent!}>
      <NotificationsProvider container={notificationContainer}>
        <ModalProvider>{children}</ModalProvider>
      </NotificationsProvider>
    </PicassoGlobalStylesProvider>
  </MuiThemeProvider>
)

Picasso.defaultProps = {
  loadFonts: true,
  loadFavicon: true,
  reset: true,
  RootComponent: PicassoRootNode
}

export { PicassoProvider }
export default Picasso
