import React, { createContext, useState, useContext, useEffect } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import type { LexicalNode, Klass } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

import { registerLexicalEvents } from '../LexicalEditor/utils/registerLexicalEvents'

export const RTEPluginMeta = Symbol('PicassoRTEPluginMeta')

export type RTEPluginMeta = {
  name: string
  lexical?: {
    nodes?: Klass<LexicalNode>[]
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface RTEPlugin<P> {
  (props: P): ReactElement | null
  [RTEPluginMeta]?: RTEPluginMeta
}

export const isRTEPluginElement = (plugin: {}): plugin is ReactElement<
  unknown,
  RTEPlugin<unknown>
> => {
  return (
    React.isValidElement(plugin) &&
    typeof plugin.type === 'function' &&
    RTEPluginMeta in plugin.type
  )
}

type RTEPluginContextValue = {
  disabled: boolean
  focused: boolean
  toolbarPortalEl?: HTMLElement
  setToolbarPortalEl: (element: HTMLElement | null) => void
}

export const useRTEUpdate = (callback: () => void) => {
  const [editor] = useLexicalComposerContext()

  useEffect(
    () =>
      registerLexicalEvents({
        editor,
        updateToolbar: callback,
      }),
    [callback, editor]
  )
}

const RTEPluginContext = createContext<RTEPluginContextValue>({
  disabled: false,
  focused: false,
  setToolbarPortalEl: () => {},
})

export type ToolbarPortalProviderProps = {
  children: ReactNode
  disabled: boolean
  focused: boolean
}

export const RTEPluginContextProvider = ({
  children,
  disabled,
  focused,
}: ToolbarPortalProviderProps) => {
  const [element, setElement] = useState<HTMLElement | null>(null)

  const value: RTEPluginContextValue = {
    disabled,
    focused,
    toolbarPortalEl: element ?? undefined,
    setToolbarPortalEl: setElement,
  }

  return (
    <RTEPluginContext.Provider value={value}>
      {children}
    </RTEPluginContext.Provider>
  )
}

export const useToolbarPortalRegister = () => {
  const { setToolbarPortalEl } = useContext(RTEPluginContext)

  return {
    setToolbarPortalEl,
  }
}

export const useRTEPluginContext = () => {
  const { disabled, focused } = useContext(RTEPluginContext)

  return {
    disabled,
    focused,
  }
}

export type ToolbarProps = {
  children: ReactNode
  keyName: string
}

export const Toolbar = ({ children, keyName }: ToolbarProps) => {
  const { toolbarPortalEl: element } = useContext(RTEPluginContext)

  return <>{element && createPortal(children, element, keyName)}</>
}
