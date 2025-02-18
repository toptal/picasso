import type { ReactNode, ForwardRefExoticComponent, RefAttributes } from 'react'
import React, { useEffect, useRef, useState } from 'react'

import type { RootContextProps } from './RootContext'
import { RootContext } from './RootContext'
import type { EnvironmentType, TextLabelProps } from '../types'
import type { PicassoRootNodeProps } from './PicassoRootNode'
import type { BreakpointKeys } from './config/breakpoints'
import { useScreens } from './config/breakpoints'

export interface PicassoGlobalStylesProviderProps extends TextLabelProps {
  children?: ReactNode
  RootComponent: ForwardRefExoticComponent<
    PicassoRootNodeProps & RefAttributes<HTMLDivElement>
  >
  environment: EnvironmentType<'test' | 'temploy'>
  disableTransitions?: boolean
  preventPageWidthChangeOnScrollbar?: boolean
}

const breakpointKeyByRange: Record<BreakpointKeys, BreakpointKeys> = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
}

const PicassoGlobalStylesProvider = (
  props: PicassoGlobalStylesProviderProps
) => {
  const {
    children,
    RootComponent,
    environment,
    titleCase,
    disableTransitions,
    preventPageWidthChangeOnScrollbar,
  } = props

  const rootRef = useRef<HTMLDivElement | null>(null)

  const screens = useScreens<BreakpointKeys>()
  const currentBreakpointRange = screens(breakpointKeyByRange)

  const [contextValue, setContextValue] = useState<RootContextProps>({
    rootRef,
    currentBreakpointRange,
    environment,
    titleCase,
    disableTransitions,
    preventPageWidthChangeOnScrollbar,
  })

  useEffect(() => {
    if (contextValue.currentBreakpointRange !== currentBreakpointRange) {
      setContextValue({
        ...contextValue,
        currentBreakpointRange,
      })
    }
  }, [currentBreakpointRange])

  return (
    <RootComponent ref={rootRef}>
      <RootContext.Provider value={contextValue}>
        {children}
      </RootContext.Provider>
    </RootComponent>
  )
}

export default PicassoGlobalStylesProvider
