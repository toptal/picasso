import type { ReactNode, ForwardRefExoticComponent, RefAttributes } from 'react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

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

  const screens = useScreens<BreakpointKeys>()
  const currentBreakpointRange = screens(breakpointKeyByRange)

  const [picassoRootMounted, setPicassoRootMounted] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [contextValue, setContextValue] = useState<RootContextProps>({
    rootRef,
    currentBreakpointRange,
    hasTopBar: false,
    setHasTopBar: (hasTopBar: boolean) => {
      setContextValue(context => ({
        ...context,
        hasTopBar,
      }))
    },
    environment,
    titleCase,
    hasDrawer: false,
    setHasDrawer: (hasDrawer: boolean) => {
      setContextValue(context => ({
        ...context,
        hasDrawer,
      }))
    },
    hasSidebar: false,
    setHasSidebar: (hasSidebar: boolean) => {
      setContextValue(context => ({
        ...context,
        hasSidebar,
      }))
    },
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

  const setRootRef = useCallback(
    (ref: HTMLDivElement) => {
      rootRef.current = ref
      setPicassoRootMounted(true)
    },
    [setPicassoRootMounted]
  )

  return (
    <RootComponent ref={setRootRef}>
      <RootContext.Provider value={contextValue}>
        {picassoRootMounted && children}
      </RootContext.Provider>
    </RootComponent>
  )
}

export default PicassoGlobalStylesProvider
