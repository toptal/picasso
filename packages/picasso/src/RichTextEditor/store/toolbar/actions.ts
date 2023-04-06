import type { Dispatch } from 'react'

import actionTypes from './actionTypes'
import type {
  SetBoldActionType,
  SetHeaderActionType,
  SetItalicActionType,
  SetListActionType,
  SetDisabled,
  ResetFormatType,
  SetLinkActionType,
} from './types'

const setBold =
  (dispatch: Dispatch<SetBoldActionType>) =>
  (payload: SetBoldActionType['payload']) =>
    dispatch({ type: actionTypes.bold, payload })

const setItalic =
  (dispatch: Dispatch<SetItalicActionType>) =>
  (payload: SetItalicActionType['payload']) =>
    dispatch({ type: actionTypes.italic, payload })

const setHeader =
  (dispatch: Dispatch<SetHeaderActionType>) =>
  (payload: SetHeaderActionType['payload']) =>
    dispatch({ type: actionTypes.header, payload })

const setList =
  (dispatch: Dispatch<SetListActionType>) =>
  (payload: SetListActionType['payload']) =>
    dispatch({ type: actionTypes.list, payload })

const setLink =
  (dispatch: Dispatch<SetLinkActionType>) =>
  (payload: SetLinkActionType['payload']) =>
    dispatch({ type: actionTypes.link, payload })

const setDisabled = (dispatch: Dispatch<SetDisabled>) => (payload: boolean) =>
  dispatch({ type: actionTypes.disabled, payload })

const resetFormat = (dispatch: Dispatch<ResetFormatType>) => () =>
  dispatch({ type: actionTypes.resetFormat })

const actions = {
  setBold,
  setItalic,
  setHeader,
  setList,
  setLink,
  setDisabled,
  resetFormat,
}

export default actions
