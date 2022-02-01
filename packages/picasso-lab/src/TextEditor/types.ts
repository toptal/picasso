import { MouseEventHandler, ChangeEvent } from 'react'

import { EditorActionsType, EditorStateType } from './store/editor/types'
import { ToolbarActionsType, ToolbarStateType } from './store/toolbar/types'

export type HTMLString = string

export type HeaderValueType = '3' | ''

export type TextEditorChangeHandler = (value: HTMLString) => void

export type ButtonHandlerType = MouseEventHandler<HTMLButtonElement>

export type SelectOnChangeHandler = (
  event: ChangeEvent<{
    value: HeaderValueType
  }>
) => void

export type StateType = {
  toolbar: ToolbarStateType
  editor: EditorStateType
}

export type ActionsType = ToolbarActionsType | EditorActionsType
