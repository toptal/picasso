import React, {
  ReactNode,
  useRef,
  useState,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react'

import { RootContext } from './RootContext'
import { EnvironmentType, TextLabelProps } from '../types'
import { PicassoRootNodeProps } from './PicassoRootNode'

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

  const rootRef = useRef<HTMLDivElement>(null)
  const [contextValue, setContextValue] = useState({
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

  return (
    <RootComponent ref={rootRef}>
      <RootContext.Provider value={contextValue}>
        {children}
      </RootContext.Provider>
    </RootComponent>
  )
}

export default PicassoGlobalStylesProvider
