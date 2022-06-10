import * as toolbarStore from './toolbar'
import { StateType, ActionsType } from './types'

export * from './types'

export const combinedReducers = (state: StateType, action: ActionsType) => {
  return {
    toolbar: toolbarStore.reducer(state.toolbar, action),
  }
}

export const initialState = {
  toolbar: toolbarStore.initialState,
}
