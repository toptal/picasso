import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import type { Klass, LexicalNode } from 'lexical'
import type { ReactElement, ReactNode } from 'react'
import React, { createContext, useContext, useEffect } from 'react'

import { registerLexicalEvents } from '../LexicalEditor/utils'
import { ToolbarProvider } from './Toolbar/Toolbar'

export const RTEPluginMeta = Symbol('PicassoRTEPluginMeta')

export type RTEPluginMeta = {
  name: string
  lexical?: {
    nodes?: Klass<LexicalNode>[]
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface RTEPlugin<P = any> {
  (props: P): ReactElement | null
  [RTEPluginMeta]?: RTEPluginMeta
}

export const isRTEPluginElement = (plugin: {}): plugin is ReactElement<
  unknown,
  RTEPlugin
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
  const value: RTEPluginContextValue = {
    disabled,
    focused,
  }

  return (
    <ToolbarProvider>
      <RTEPluginContext.Provider value={value}>
        {children}
      </RTEPluginContext.Provider>
    </ToolbarProvider>
  )
}

export const useRTEPluginContext = () => {
  const { disabled, focused } = useContext(RTEPluginContext)

  return {
    disabled,
    focused,
  }
}

export {
  Props as ToolbarProps,
  Toolbar,
  useToolbarPortalRegister,
} from './Toolbar/Toolbar'
