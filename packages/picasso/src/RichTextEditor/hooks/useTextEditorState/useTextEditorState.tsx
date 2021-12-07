import { useReducer } from 'react'

import { combinedReducers, initialState } from '../../store'

const useTextEditorState = () => {
  const [state, dispatch] = useReducer(combinedReducers, initialState)

  return { state, dispatch }
}

export default useTextEditorState
