import { useReducer, useCallback } from 'react'

import {
  ToolbarStateType,
  SetToolbarStateKeyType,
  ActionType
} from '../../types'
import { EMPTY_STATE } from '../../constants'

const reducer = (state = EMPTY_STATE, action: ActionType) => {
  switch (action.type) {
    case 'setAll':
      return action.payload
    case 'set':
      return {
        ...state,
        [action.key]: action.payload
      }
    default:
      throw Error('unkown action')
  }
}

const useEditorReducer = () => {
  const [toolbarState, dispatch] = useReducer(reducer, EMPTY_STATE)

  const setToolbarState = useCallback(
    (payload: ToolbarStateType) => dispatch({ type: 'setAll', payload }),
    [dispatch]
  )

  const setToolbarStateKey: SetToolbarStateKeyType = useCallback(
    (key, payload) =>
      dispatch({
        type: 'set',
        key,
        payload
      }),
    [dispatch]
  )

  const actions = {
    setToolbarState,
    setToolbarStateKey
  }

  return { toolbarState, actions }
}

export default useEditorReducer
