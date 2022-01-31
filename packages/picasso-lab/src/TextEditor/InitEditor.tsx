import React, { createContext, Dispatch } from 'react'
import Quill from 'quill'

import useQuillInstance from './hooks/useQuillInstance'
import useTextEditorState from './hooks/useTextEditorState'
import { StateType, ActionsType } from './types'
import { TextEditorProps } from './index'
import { initialState } from './hooks/useTextEditorState/useTextEditorState'
import { ToolbarActionsType } from './store/toolbar/types'
import { EditorActionsType } from './store/editor/types'
import useHasFocus from './hooks/useHasFocus'

type RenderProps = {
  state: StateType
}

type Props = {
  id: string
  placeholder?: string
  children: (props: RenderProps) => JSX.Element
}

export const DispatchContext = createContext<Dispatch<
  ToolbarActionsType | EditorActionsType
> | null>(null)
export const StateContext = createContext<StateType>(initialState)

const InitQuillDependantHooks = ({
  quill,
  state,
  dispatch
}: {
  disabled: boolean
  dispatch: Dispatch<ActionsType>
  state: StateType
  onChange: TextEditorProps['onChange']
  quill: Quill
}) => {
  useHasFocus({ quill, state, dispatch })

  return null
}

const InitEditor = ({ id, placeholder, children }: Props) => {
  // TODO: refactor toolbarState to editorState and keep this info there.

  const { dispatch, state } = useTextEditorState()
  const quill = useQuillInstance({ id, placeholder, dispatch })

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children({
          state
        })}

        {quill && (
          <InitQuillDependantHooks
            quill={quill}
            dispatch={dispatch}
            state={state}
          />
        )}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export default InitEditor
