import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, type Klass, type LexicalNode } from 'lexical'
import type { ReactElement, ReactNode } from 'react'
import React, { createContext, useContext, useEffect, useState } from 'react'

import { registerLexicalEvents } from '../LexicalEditor/utils/register-lexical-events'
import { ToolbarProvider } from './Toolbar/Toolbar'

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
  disabledFormatting: boolean
  focused: boolean
  setDisabledFormatting: (value: boolean) => void
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
  disabledFormatting: false,
  focused: false,
  setDisabledFormatting: () => {},
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
  const [disabledFormatting, setDisabledFormatting] = useState(false)

  /**
   * When the editor renders, the selection is null.
   * As soon as we focus the lexical editor (we can see the blinking text edit cursor),
   * the selection is not null.
   * When the user focuses the editor for first time by clicking into the toolbar area,
   * the selection is still null and this functionality is covering this edge case.
   * When the lexical editor has no selection, we disable the toolbar buttons.
   **/
  const [toolbarDisabled, setToolbarDisabled] = useState(true)

  useRTEUpdate(() => {
    const selection = $getSelection()

    if (selection === null) {
      setToolbarDisabled(true)
    } else {
      setToolbarDisabled(false)
    }
  })

  const value: RTEPluginContextValue = {
    disabled: toolbarDisabled || disabled,
    disabledFormatting,
    setDisabledFormatting,
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
  const { disabled, focused, disabledFormatting, setDisabledFormatting } =
    useContext(RTEPluginContext)

  return {
    disabled,
    disabledFormatting,
    focused,
    setDisabledFormatting,
  }
}

export {
  Props as ToolbarProps,
  Toolbar,
  useToolbarPortalRegister,
} from './Toolbar/Toolbar'
