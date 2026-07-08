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
  responsive?: boolean
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
  responsive: true,
  currentBreakpointRange: undefined,
})

// State-backed Picasso root node. Kept in a dedicated context (instead of a
// field on RootContext) so that only `usePicassoRoot` consumers re-render
// when the node becomes available after the first mount.
export const PicassoRootNodeContext =
  React.createContext<HTMLDivElement | null>(null)

export const usePicassoRoot = (): HTMLDivElement | undefined => {
  const context = useContext(RootContext)
  const rootNode = useContext(PicassoRootNodeContext)

  // rootNode is state-backed, so components rendered before the root node
  // mounts (e.g. a Modal open on first mount) re-render once it exists;
  // rootRef stays as a fallback for providers that only populate the ref.
  // An unresolved root is `undefined`, NOT `null`: Base UI portals treat an
  // explicit `null` container as "wait for the container" and render nothing,
  // while `undefined` falls back to `document.body` — so this hook's result
  // can be passed to any portal container without per-callsite coercion.
  return rootNode ?? context?.rootRef?.current ?? undefined
}

export const usePageTopBar = () => {
  const context = useContext(RootContext)

  return {
    hasTopBar: context.hasTopBar,
    setHasTopBar: context.setHasTopBar,
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
    responsive: context.responsive,
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
