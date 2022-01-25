import { useReducer, useCallback, useMemo } from 'react'

import {
  ToolbarStateType,
  ActionType,
  SetBoldActionCreator,
  SetHeaderActionCreator,
  SetItalicActionCreator,
  SetListActionCreator,
  ActionTypes
} from '../../types'
import { EMPTY_STATE } from '../../constants'

const reducer = (state: ToolbarStateType, action: ActionType) => {
  switch (action.type) {
    case ActionTypes.bold:
      return {
        ...state,
        bold: action.payload
      }
    case ActionTypes.italic:
      return {
        ...state,
        italic: action.payload
      }
    case ActionTypes.header:
      return {
        ...state,
        header: action.payload
      }
    case ActionTypes.list:
      return {
        ...state,
        list: action.payload
      }

    default:
      throw Error('unkown action')
  }
}

const useToolbarState = () => {
  const [toolbarState, dispatch] = useReducer(reducer, EMPTY_STATE)

  const setBold: SetBoldActionCreator = useCallback(
    payload => dispatch({ type: 'setBold', payload }),
    [dispatch]
  )

  const setItalic: SetItalicActionCreator = useCallback(
    payload => dispatch({ type: 'setItalic', payload }),
    [dispatch]
  )

  const setHeader: SetHeaderActionCreator = useCallback(
    payload => dispatch({ type: 'setHeader', payload }),
    [dispatch]
  )

  const setList: SetListActionCreator = useCallback(
    payload => dispatch({ type: 'setList', payload }),
    [dispatch]
  )

  const actions = useMemo(
    () => ({
      setBold,
      setItalic,
      setHeader,
      setList
    }),
    [setBold, setItalic, setHeader, setList]
  )

  return { toolbarState, actions }
}

export default useToolbarState
