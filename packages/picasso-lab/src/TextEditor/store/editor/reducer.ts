import actionTypes from './actionTypes'
import { EditorStateType, EditorActionsType } from './types'

const reducer = (
  state: EditorStateType,
  action: EditorActionsType
): EditorStateType => {
  console.log({ editorState: action })
  switch (action.type) {
    case actionTypes.setIsFocused:
      return {
        ...state,
        isFocused: action.payload
      }
    default:
      return state
  }
}

export default reducer
