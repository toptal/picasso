import { EditorStateType, EditorActionsType } from './editor/types'
import { ToolbarStateType, ToolbarActionsType } from './toolbar/types'

export type StateType = {
  editor: EditorStateType
  toolbar: ToolbarStateType
}

export type ActionsType = EditorActionsType | ToolbarActionsType
