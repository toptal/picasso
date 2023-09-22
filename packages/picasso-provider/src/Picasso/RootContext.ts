import type { RefObject } from 'react'
import React, { useContext } from 'react'

import type { TextLabelProps, EnvironmentType } from '../types'
import type { BreakpointKeys } from './config'

export interface RootContextProps extends TextLabelProps {
  rootRef?: RefObject<HTMLDivElement>
  hasTopBar: boolean
  setHasTopBar: (value: boolean) => void
  hasSidebar: boolean
  setHasSidebar: (value: boolean) => void
  environment: EnvironmentType<'test' | 'temploy'>
  hasDrawer: boolean
  setHasDrawer: (value: boolean) => void
  disableTransitions?: boolean
  currentBreakpointRange?: BreakpointKeys
  preventPageWidthChangeOnScrollbar?: boolean
}

export const RootContext = React.createContext<RootContextProps>({
  hasTopBar: false,
  setHasTopBar: () => {},
  hasSidebar: false,
  setHasSidebar: () => {},
  environment: 'development',
  titleCase: false,
  hasDrawer: false,
  setHasDrawer: () => {},
  disableTransitions: false,
  currentBreakpointRange: undefined,
})

export const usePicassoRoot = () => {
  const context = useContext(RootContext)

  return context && context.rootRef ? context.rootRef.current : null
}

export const usePageTopBar = () => {
  const context = useContext(RootContext)

  return {
    hasTopBar: context.hasTopBar,
    setHasTopBar: context.setHasTopBar,
  }
}

export const usePageDrawer = () => {
  const context = useContext(RootContext)

  return {
    hasDrawer: context.hasDrawer,
    setHasDrawer: context.setHasDrawer,
  }
}

export const useDrawer = () => {
  const context = useContext(RootContext)

  return {
    hasDrawer: context.hasDrawer,
    setHasDrawer: context.setHasDrawer,
  }
}

export const useSidebar = () => {
  const context = useContext(RootContext)

  return {
    hasSidebar: context.hasSidebar,
    setHasSidebar: context.setHasSidebar,
  }
}

export const useAppConfig = () => {
  const context = useContext(RootContext)

  return {
    environment: context.environment,
    titleCase: context.titleCase,
    disableTransitions: context.disableTransitions,
  }
}

export const useCurrentBreakpointRange = () => {
  const context = useContext(RootContext)

  return {
    currentBreakpointRange: context.currentBreakpointRange,
  }
}

export const usePreventPageWidthChangeOnScrollbar = () => {
  const context = useContext(RootContext)

  return {
    preventPageWidthChangeOnScrollbar:
      context.preventPageWidthChangeOnScrollbar,
  }
}
