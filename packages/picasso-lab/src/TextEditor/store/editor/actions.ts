import { Dispatch } from 'react'

import actionTypes from './actionTypes'
import { EditorIsFocusedActionType } from './types'

const setIsFocused = (dispatch: Dispatch<EditorIsFocusedActionType>) => (
  payload: EditorIsFocusedActionType['payload']
) =>
  dispatch({
    type: actionTypes.setIsFocused,
    payload
  })

const actions = { setIsFocused }

export default actions
