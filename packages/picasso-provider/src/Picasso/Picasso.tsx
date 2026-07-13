import type { ReactNode } from 'react'
import React from 'react'

import FontsLoader from './FontsLoader'
import HelmetProvider from './HelmetProvider'
import NotificationsProvider from './NotificationsProvider'
import Favicon from '../Favicon'
import type { EnvironmentType, TextLabelProps } from '../types'
import { PicassoBreakpoints } from './config'
import FixViewport from './FixViewport'
import type { PicassoGlobalStylesProviderProps } from './PicassoGlobalStylesProvider'
import PicassoGlobalStylesProvider from './PicassoGlobalStylesProvider'
import PicassoRootNode from './PicassoRootNode'
import PreventPageWidthChangeOnScrollbar from '../PreventPageWidthChangeOnScrollbar'

export interface PicassoProps extends TextLabelProps {
  children?: ReactNode
  /** Whether to load fonts file to the page */
  loadFonts?: boolean
  /** Whether to specify favicons in the head */
  loadFavicon?: boolean
  /** current environment */
  environment?: EnvironmentType<'test' | 'temploy'>
  /** Sets a minimum width of the page */
  responsive?: boolean
  /** Whether to load viewport fix or not */
  fixViewport?: boolean
  /** Whether to load scrollbar page jump fix or not */
  preventPageWidthChangeOnScrollbar?: boolean
  /** Notification DOMNode for createPortal */
  notificationContainer?: HTMLElement
  /** Component that is used to render root node  */
  RootComponent?: PicassoGlobalStylesProviderProps['RootComponent']
  /** Disables usage of `<HelmetProvider>` component from `react-helmet-async` package */
  disableHelmet?: boolean
  /** Disables transitions for components like Loader, to make testing easier */
  disableTransitions?: boolean
}

const Picasso = ({
  loadFonts = true,
  loadFavicon = true,
  responsive = true,
  environment = 'development',
  children,
  preventPageWidthChangeOnScrollbar = true,
  fixViewport = true,
  notificationContainer,
  RootComponent = PicassoRootNode,
  titleCase,
  disableHelmet,
  disableTransitions,
}: PicassoProps) => {
  if (!responsive) {
    PicassoBreakpoints.disableMobileBreakpoints()
  }

  return (
    <PicassoGlobalStylesProvider
      RootComponent={RootComponent}
      environment={environment}
      titleCase={titleCase}
      disableTransitions={disableTransitions}
      responsive={responsive}
      preventPageWidthChangeOnScrollbar={preventPageWidthChangeOnScrollbar}
    >
      <HelmetProvider disabled={disableHelmet}>
        {fixViewport && <FixViewport />}
        {loadFonts && <FontsLoader />}
        {preventPageWidthChangeOnScrollbar && (
          <PreventPageWidthChangeOnScrollbar />
        )}
        {loadFavicon && <Favicon environment={environment} />}
        <NotificationsProvider container={notificationContainer}>
          {children}
        </NotificationsProvider>
      </HelmetProvider>
    </PicassoGlobalStylesProvider>
  )
}

export default Picasso
