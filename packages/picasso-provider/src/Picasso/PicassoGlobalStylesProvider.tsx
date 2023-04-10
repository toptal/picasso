import type { ReactNode, ForwardRefExoticComponent, RefAttributes } from 'react'
import React, { useRef, useState, useCallback } from 'react'

import type { RootContextProps } from './RootContext'
import { RootContext } from './RootContext'
import type { EnvironmentType, TextLabelProps } from '../types'
import type { PicassoRootNodeProps } from './PicassoRootNode'
import { isBrowser } from '../utils'

export interface PicassoGlobalStylesProviderProps extends TextLabelProps {
  children?: ReactNode
  RootComponent: ForwardRefExoticComponent<
    PicassoRootNodeProps & RefAttributes<HTMLDivElement>
  >
  environment: EnvironmentType<'test' | 'temploy'>
  disableTransitions?: boolean
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
  const [contextValue, setContextValue] = useState<RootContextProps>({
    rootRef,
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
