export {
  default,
  FixViewport,
  FixViewportProps,
  FontsLoader,
  NotificationsProvider,
  NotificationsProviderProps,
  PicassoLight,
} from './Picasso'

export {
  useScreenSize,
  isScreenSize,
  useBreakpoint,
  breakpointsList,
  useScreens,
  colors,
  gradients,
  palette,
  layout,
  breakpoints,
  screens,
  transitions,
  typography,
  sizes,
  shadows,
  PicassoBreakpoints,
  spacings,
  SpacingEnum,
  isResponsiveSpacing,
  fonts,
} from './Picasso/config'

export type {
  Sizes,
  SizeType,
  SpacingType,
  ResponsiveSpacingType,
  DeprecatedSpacingType,
  PicassoSpacing,
  BreakpointKeys,
} from './Picasso/config'

export {
  usePicassoRoot,
  usePageTopBar,
  useAppConfig,
  useDrawer,
  useSidebar,
  useCurrentBreakpointRange,
  RootContext,
  PicassoRootNodeContext,
} from './Picasso/RootContext'

export * from './Picasso/utils'
export * from './utils'
export * from './Picasso/config'

export { default as Favicon } from './Favicon'

// Rendering this re-export keeps a helmet on the same react-helmet-async
// instance as the `<HelmetProvider>` that `<Picasso>` renders
export { Helmet } from 'react-helmet-async'
export type { HelmetProps } from 'react-helmet-async'
