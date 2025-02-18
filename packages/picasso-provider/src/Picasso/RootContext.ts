import type { RefObject } from 'react'
import React, { useContext } from 'react'

import type { TextLabelProps, EnvironmentType } from '../types'
import type { BreakpointKeys } from './config'

export interface RootContextProps extends TextLabelProps {
  rootRef?: RefObject<HTMLDivElement>
  environment: EnvironmentType<'test' | 'temploy'>
  disableTransitions?: boolean
  currentBreakpointRange?: BreakpointKeys
  preventPageWidthChangeOnScrollbar?: boolean
}

export const RootContext = React.createContext<RootContextProps>({
  environment: 'development',
  titleCase: false,
  disableTransitions: false,
  currentBreakpointRange: undefined,
})

export const usePicassoRoot = () => {
  const context = useContext(RootContext)

  return context && context.rootRef ? context.rootRef.current : null
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
