import type { ReactNode, ForwardRefExoticComponent, RefAttributes } from 'react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import type { RootContextProps } from './RootContext'
import { PicassoRootNodeContext, RootContext } from './RootContext'
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
  // The ref alone is not enough for consumers that read the root node during
  // the tree's first render pass (refs populate at commit, and a ref mutation
  // triggers no re-render) — mirror the node into state so they re-render
  // once it exists
  const [rootNode, setRootNode] = useState<HTMLDivElement | null>(null)

  const attachRootRef = useCallback((node: HTMLDivElement | null) => {
    rootRef.current = node
    setRootNode(node)
  }, [])

  const screens = useScreens<BreakpointKeys>()
  const currentBreakpointRange = screens(breakpointKeyByRange)

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

  return (
    <RootComponent ref={attachRootRef}>
      <PicassoRootNodeContext.Provider value={rootNode}>
        <RootContext.Provider value={contextValue}>
          {children}
        </RootContext.Provider>
      </PicassoRootNodeContext.Provider>
    </RootComponent>
  )
}

export default PicassoGlobalStylesProvider
