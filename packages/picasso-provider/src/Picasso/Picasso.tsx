import {
  ThemeProvider,
  StyledEngineProvider,
  DeprecatedThemeOptions,
} from '@mui/material/styles'
import React, { ReactNode } from 'react'

import FontsLoader from './FontsLoader'
import Favicon from '../Favicon'
import { EnvironmentType, TextLabelProps } from '../types'
import { PicassoBreakpoints } from './config'
import PicassoProvider from './PicassoProvider'
import FixViewport from './FixViewport'
import PicassoGlobalStylesProvider, {
  PicassoGlobalStylesProviderProps,
} from './PicassoGlobalStylesProvider'
import PicassoRootNode from './PicassoRootNode'

export interface PicassoProps extends TextLabelProps {
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
  theme?: DeprecatedThemeOptions
  /** Disables transitions for components like Loader, to make testing easier */
  disableTransitions?: boolean
  /** Disables unique prefix for styles class names */
  disableClassNamePrefix?: boolean
  /**
   * By default, the styles are injected last in the <head> element of the page.
   * As a result, they gain more specificity than any other style sheet.
   * If you want to override Picasso's styles, set this prop.
   */
  injectFirst?: boolean
}

const Picasso = ({
  loadFonts,
  loadFavicon,
  responsive,
  environment = 'development',
  fixViewport,
  RootComponent = PicassoRootNode,
  titleCase,
  theme,
  disableTransitions,
}: PicassoProps) => {
  if (theme) {
    PicassoProvider.extendTheme(theme)
  }

  if (!responsive) {
    PicassoProvider.disableResponsiveStyle()
    PicassoBreakpoints.disableMobileBreakpoints()
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={PicassoProvider.theme}>
        <PicassoGlobalStylesProvider
          RootComponent={RootComponent}
          environment={environment}
          titleCase={titleCase}
          disableTransitions={disableTransitions}
        >
          {fixViewport && <FixViewport />}
          {loadFonts && <FontsLoader />}
          {loadFavicon && <Favicon environment={environment} />}
        </PicassoGlobalStylesProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

Picasso.defaultProps = {
  environment: 'development',
  loadFonts: true,
  loadFavicon: true,
  responsive: true,
  reset: true,
  fixViewport: true,
  injectFirst: undefined,
  RootComponent: PicassoRootNode,
}

export default Picasso
