import { combineReducers } from '@reduxjs/toolkit'

import * as toolbarStore from './toolbar'
import { StateType } from './types'

export * from './types'

export const combinedReducers = combineReducers<StateType>({
  toolbar: toolbarStore.reducer
})

export const initialState = {
  toolbar: toolbarStore.initialState
}
