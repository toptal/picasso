import actionTypes from './actionTypes'
import { EditorReducerType } from './types'
import initialState from './initialState'

const reducer: EditorReducerType = (state = initialState, action) => {
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
