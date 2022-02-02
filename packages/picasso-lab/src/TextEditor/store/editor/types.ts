import actionTypes from './actionTypes'

export type EditorStateType = {
  isFocused: boolean
}

export type EditorIsFocusedActionType = {
  type: typeof actionTypes['setIsFocused']
  payload: EditorStateType['isFocused']
}

export type EditorActionsType = EditorIsFocusedActionType

export type EditorReducerType = (
  state: EditorStateType | undefined,
  action: EditorActionsType
) => EditorStateType
