import { Dispatch } from 'react'

import actionTypes from './actionTypes'
import {
  SetBoldActionType,
  SetHeaderActionType,
  SetItalicActionType,
  SetListActionType,
  SetHandlersActionType
} from './types'

const setBold = (dispatch: Dispatch<SetBoldActionType>) => (
  payload: SetBoldActionType['payload']
) => dispatch({ type: actionTypes.bold, payload })

const setItalic = (dispatch: Dispatch<SetItalicActionType>) => (
  payload: SetItalicActionType['payload']
) => dispatch({ type: actionTypes.italic, payload })

const setHeader = (dispatch: Dispatch<SetHeaderActionType>) => (
  payload: SetHeaderActionType['payload']
) => dispatch({ type: actionTypes.header, payload })

const setList = (dispatch: Dispatch<SetListActionType>) => (
  payload: SetListActionType['payload']
) => dispatch({ type: actionTypes.list, payload })

const setHandlers = (dispatch: Dispatch<SetHandlersActionType>) => (
  payload: SetHandlersActionType['payload']
) => dispatch({ type: actionTypes.handlers, payload })

const actions = {
  setBold,
  setItalic,
  setHeader,
  setList,
  setHandlers
}

export default actions
