import {
  MuiThemeProvider,
  ThemeOptions,
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'
import React, { ReactNode } from 'react'

import CssBaseline from '../CssBaseline'
import FontsLoader from './FontsLoader'
import HelmetProvider from './HelmetProvider'
import NotificationsProvider from './NotificationsProvider'
import Favicon from '../Favicon'
import { EnvironmentType, TextLabelProps } from '../types'
import { generateRandomStringOrGetEmptyInTest } from './utils'
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
  theme?: ThemeOptions
  /** Disables usage of `<HelmetProvider>` component from `react-helmet-async` package */
  disableHelmet?: boolean
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
  reset,
  responsive,
  environment = 'development',
  children,
  fixViewport,
  notificationContainer,
  RootComponent = PicassoRootNode,
  titleCase,
  theme,
  disableHelmet,
  disableTransitions,
  disableClassNamePrefix,
  injectFirst,
}: PicassoProps) => {
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
    seed: disableClassNamePrefix ? '' : generateRandomStringOrGetEmptyInTest(),
  })

  return (
    <StylesProvider
      generateClassName={generateClassName}
      injectFirst={injectFirst}
    >
      <MuiThemeProvider theme={PicassoProvider.theme}>
        <PicassoGlobalStylesProvider
          RootComponent={RootComponent}
          environment={environment}
          titleCase={titleCase}
          disableTransitions={disableTransitions}
        >
          <HelmetProvider disabled={disableHelmet}>
            {fixViewport && <FixViewport />}
            {loadFonts && <FontsLoader />}
            {reset && <CssBaseline />}
            {loadFavicon && <Favicon environment={environment} />}
            <NotificationsProvider container={notificationContainer}>
              {children}
            </NotificationsProvider>
          </HelmetProvider>
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
  injectFirst: undefined,
  RootComponent: PicassoRootNode,
}

export default Picasso
