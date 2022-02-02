import { combineReducers } from '@reduxjs/toolkit'

import * as editorStore from './editor'
import * as toolbarStore from './toolbar'
import { StateType } from './types'

export * from './types'

export const combinedReducers = combineReducers<StateType>({
  toolbar: toolbarStore.reducer,
  editor: editorStore.reducer
})

export const initialState = {
  toolbar: toolbarStore.initialState,
  editor: editorStore.initialState
}
