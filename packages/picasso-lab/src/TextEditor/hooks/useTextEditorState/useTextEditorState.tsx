import { useMemo, useReducer } from 'react'

import * as editorStore from '../../store/editor'
import * as toolbarStore from '../../store/toolbar'
import { ToolbarReducerType } from '../../store/toolbar/types'
import { EditorReducerType } from '../../store/editor/types'
import { StateType, ActionsType } from '../../types'

type CombinedReducers = {
  toolbar: ToolbarReducerType
  editor: EditorReducerType
}

const combineReducers = (reducers: CombinedReducers) => (
  state: StateType,
  action: ActionsType
): StateType => {
  const newState: StateType = Object.keys(reducers).reduce(
    (acc: StateType, prop: keyof CombinedReducers) => ({
      ...acc,
      [prop]: reducers[prop](acc[prop], action)
    }),
    state
  )

  return newState
}

const rootReducer = combineReducers({
  toolbar: toolbarStore.reducer,
  editor: editorStore.reducer
})

export const initialState = {
  toolbar: toolbarStore.initialState,
  editor: editorStore.initialState
}

const useTextEditorState = () => {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  const memoizedState = useMemo(() => state, [state])

  return { state: memoizedState, dispatch }
}

export default useTextEditorState
