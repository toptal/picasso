import actionTypes from './actionTypes'
import editorActionTypes from '../editor/actionTypes'
import { ToolbarReducerType } from './types'

const reducer: ToolbarReducerType = (state, action) => {
  console.log({ toolbarAction: action })
  switch (action.type) {
    case actionTypes.bold:
      return {
        ...state,
        format: { ...state.format, bold: action.payload }
      }
    case actionTypes.italic:
      return {
        ...state,
        format: { ...state.format, italic: action.payload }
      }
    case actionTypes.header:
      return {
        ...state,
        format: { ...state.format, header: action.payload }
      }
    case actionTypes.list:
      return {
        ...state,
        format: { ...state.format, list: action.payload }
      }
    case actionTypes.handlers:
      return {
        ...state,
        handlers: action.payload
      }

    case editorActionTypes.setIsFocused:
      return {
        ...state,
        disabled: action.payload
      }

    default:
      return state
  }
}

export default reducer
