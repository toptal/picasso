import type { ReactNode, ForwardRefExoticComponent, RefAttributes } from 'react'
import React, { useEffect, useRef, useState, useCallback } from 'react'

import type { RootContextProps } from './RootContext'
import { RootContext } from './RootContext'
import type { EnvironmentType, TextLabelProps } from '../types'
import type { PicassoRootNodeProps } from './PicassoRootNode'
import { isBrowser } from '../utils'
import type { BreakpointKeys } from './config/breakpoints'
import { useScreens } from './config/breakpoints'

export interface PicassoGlobalStylesProviderProps extends TextLabelProps {
  children?: ReactNode
  RootComponent: ForwardRefExoticComponent<
    PicassoRootNodeProps & RefAttributes<HTMLDivElement>
  >
  environment: EnvironmentType<'test' | 'temploy'>
  disableTransitions?: boolean
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
  } = props

  const [picassoRootMounted, setPicassoRootMounted] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  const screens = useScreens<BreakpointKeys>()
  const currentBreakpointRange = screens(breakpointKeyByRange)

  const [contextValue, setContextValue] = useState<RootContextProps>({
    rootRef,
    currentBreakpointRange,
    hasTopBar: false,
    setHasTopBar: (hasTopBar: boolean) => {
      setContextValue({
        ...contextValue,
        hasTopBar,
      })
    },
    environment,
    titleCase,
    hasDrawer: false,
    setHasDrawer: (hasDrawer: boolean) => {
      setContextValue({
        ...contextValue,
        hasDrawer,
      })
    },
    hasSidebar: false,
    setHasSidebar: (hasSidebar: boolean) => {
      setContextValue({
        ...contextValue,
        hasSidebar,
      })
    },
    disableTransitions,
  })

  useEffect(() => {
    if (contextValue.currentBreakpointRange !== currentBreakpointRange) {
      setContextValue({
        ...contextValue,
        currentBreakpointRange,
      })
    }
  }, [currentBreakpointRange])

  const setRootRef = useCallback(
    (ref: HTMLDivElement) => {
      rootRef.current = ref
      setPicassoRootMounted(true)
    },
    [setPicassoRootMounted]
  )

  const rootNodeReady = !isBrowser() || picassoRootMounted

  return (
    <RootComponent ref={setRootRef}>
      <RootContext.Provider value={contextValue}>
        {rootNodeReady && children}
      </RootContext.Provider>
    </RootComponent>
  )
}

export default PicassoGlobalStylesProvider
