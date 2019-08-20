import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from '@material-ui/core/styles'
import React, {
  FunctionComponent,
  ReactNode,
  createRef,
  RefObject,
  useContext,
  useState,
  useEffect
} from 'react'

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
import NotificationsProvider from '../utils/Notifications/NotificationsProvider'
import globalStyles from './styles'
import { JssProps } from './types'

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
  rootRef: RefObject<HTMLDivElement> | null
  hasPageHeader: boolean
  setHasPageHeader: (value: boolean) => void
}
const RootContext = React.createContext<RootContextProps>({
  rootRef: null,
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

interface PicassoGlobalStylesProviderProps extends JssProps {
  children?: ReactNode
}

const PicassoGlobalStylesProvider = withStyles(globalStyles, {
  name: 'Picasso'
})((props: PicassoGlobalStylesProviderProps) => {
  const { classes, children } = props

  const rootRef = createRef<HTMLDivElement>()
  const [contextValue, setContextValue] = useState({
    rootRef,
    hasPageHeader: false,
    setHasPageHeader: (hasPageHeader: boolean) =>
      setContextValue({
        ...contextValue,
        hasPageHeader
      })
  })

  return (
    <div ref={rootRef} className={classes.root}>
      <RootContext.Provider value={contextValue}>
        {children}
      </RootContext.Provider>
    </div>
  )
})

interface PicassoProps {
  children?: ReactNode
  /** Whether to load fonts file to the page */
  loadFonts?: boolean
  /** Whether to apply Picasso CSS reset */
  reset?: boolean
}

const Picasso: FunctionComponent<PicassoProps> = ({
  loadFonts,
  reset,
  children
}) => {
  const [showThemeProvider, setShowThemeProvider] = useState(false)

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowThemeProvider(true)
  }, [])

  if (!showThemeProvider) {
    return null
  }

  return (
    <MuiThemeProvider theme={PicassoProvider.theme}>
      {loadFonts && <FontsLoader />}
      {reset && <CssBaseline />}
      <PicassoGlobalStylesProvider>
        <NotificationsProvider>{children}</NotificationsProvider>
      </PicassoGlobalStylesProvider>
    </MuiThemeProvider>
  )
}

Picasso.defaultProps = {
  loadFonts: true,
  reset: true
}

export { PicassoProvider }
export default Picasso
