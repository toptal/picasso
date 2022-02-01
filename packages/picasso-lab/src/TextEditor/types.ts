import { EditorActionsType, EditorStateType } from './store/editor/types'
import { ToolbarActionsType, ToolbarStateType } from './store/toolbar/types'

export type HTMLString = string

export type HeaderValueType = '3' | ''

export type TextEditorChangeHandler = (value: HTMLString) => void

export type StateType = {
  toolbar: ToolbarStateType
  editor: EditorStateType
}

export type ActionsType = ToolbarActionsType | EditorActionsType
