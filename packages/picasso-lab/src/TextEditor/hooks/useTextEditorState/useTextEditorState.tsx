import { useMemo, useReducer } from 'react'

import * as editorStore from '../../store/editor'
import * as toolbarStore from '../../store/toolbar'
import { StateType, ActionsType } from '../../types'

const allReducers = {
  toolbar: toolbarStore.reducer,
  editor: editorStore.reducer
}

const combineReducers = (reducers: typeof allReducers) => (
  state: StateType,
  action: ActionsType
): StateType => {
  const newState = {} as StateType

  Object.entries(reducers).forEach(entry => {
    const currentKey = entry[0]
    const currentReducer = entry[1]

    // @ts-ignore
    newState[currentKey] = currentReducer(state[currentKey], action)
  })

  return newState
}

const rootReducer = combineReducers(allReducers)

export const initialState = {
  toolbar: toolbarStore.initialState,
  editor: editorStore.initialState
} as const

const useTextEditorState = () => {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  const memoizedState = useMemo(() => state, [state])

  return { state: memoizedState, dispatch }
}

export default useTextEditorState
