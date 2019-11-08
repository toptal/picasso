import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from '@material-ui/core/styles'
import React, {
  FunctionComponent,
  ReactNode,
  useRef,
  RefObject,
  useContext,
  useState
} from 'react'
import { ModalProvider } from 'react-modal-hook'

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
  rootRef?: RefObject<HTMLDivElement>
  rootPicassoCheck?: boolean
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

export const useRootPicassoCheck = () => {
  const context = useContext(RootContext)

  return {
    rootPicassoCheck: context.rootPicassoCheck
  }
}

export function ensurePicassoContext<Props>(
  Component: React.JSXElementConstructor<Props>
) {
  return function SecuredPicasso(props: Props) {
    const { rootPicassoCheck } = useRootPicassoCheck()

    if (!rootPicassoCheck) {
      throw new Error(
        'Not wrapped with Picasso component, please refer to the documentation'
      )
    }

    return (
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props as Props}
      />
    )
  }
}

interface PicassoGlobalStylesProviderProps extends JssProps {
  children?: ReactNode
}

const PicassoGlobalStylesProvider = withStyles(globalStyles, {
  name: 'Picasso'
})((props: PicassoGlobalStylesProviderProps) => {
  const { classes, children } = props

  const rootRef = useRef<HTMLDivElement>(null)
  const [contextValue, setContextValue] = useState({
    rootRef,
    hasPageHeader: false,
    rootPicassoCheck: true,
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
}) => (
  <MuiThemeProvider theme={PicassoProvider.theme}>
    {loadFonts && <FontsLoader />}
    {reset && <CssBaseline />}
    <PicassoGlobalStylesProvider>
      <ModalProvider>
        <NotificationsProvider>{children}</NotificationsProvider>
      </ModalProvider>
    </PicassoGlobalStylesProvider>
  </MuiThemeProvider>
)

Picasso.defaultProps = {
  loadFonts: true,
  reset: true
}

export { PicassoProvider }
export default Picasso
