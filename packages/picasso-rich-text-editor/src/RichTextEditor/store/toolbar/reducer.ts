import actionTypes from './action-types'
import type { ToolbarReducerType } from './types'
import initialState from './initial-state'

const reducer: ToolbarReducerType = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.bold:
      return {
        ...state,
        format: { ...state.format, bold: action.payload },
      }
    case actionTypes.italic:
      return {
        ...state,
        format: { ...state.format, italic: action.payload },
      }
    case actionTypes.header:
      return {
        ...state,
        format: { ...state.format, header: action.payload },
      }
    case actionTypes.list:
      return {
        ...state,
        format: { ...state.format, list: action.payload },
      }
    case actionTypes.link:
      return {
        ...state,
        format: { ...state.format, link: action.payload },
      }
    case actionTypes.disabled:
      return {
        ...state,
        disabled: action.payload,
      }

    case actionTypes.resetFormat:
      return {
        ...state,
        format: initialState.format,
      }

    default:
      return state
  }
}

export default reducer
