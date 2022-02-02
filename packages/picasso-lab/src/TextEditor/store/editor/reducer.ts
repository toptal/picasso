import actionTypes from './actionTypes'
import { EditorReducerType } from './types'

const reducer: EditorReducerType = (state, action) => {
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
