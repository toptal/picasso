import { MouseEventHandler, ChangeEvent } from 'react'

import { HeaderValueType } from '../../types'
import actionTypes from './actionTypes'

export type SelectOnChangeHandler = (
  event: ChangeEvent<{
    value: HeaderValueType
  }>
) => void

export type ButtonHandlerType = MouseEventHandler<HTMLButtonElement>

export type ToolbarHandlers = {
  handleHeader?: SelectOnChangeHandler
  handleBold?: ButtonHandlerType
  handleItalic?: ButtonHandlerType
  handleOrdered?: ButtonHandlerType
  handleUnordered?: ButtonHandlerType
}

export type ToolbarStateType = {
  format: {
    header: HeaderValueType
    bold: boolean
    italic: boolean
    list: 'bullet' | 'ordered' | false
  }
  handlers: ToolbarHandlers,
  disabled: boolean
}

export type SetBoldActionType = {
  type: typeof actionTypes.bold
  payload: ToolbarStateType['format']['bold']
}

export type SetItalicActionType = {
  type: typeof actionTypes.italic
  payload: ToolbarStateType['format']['italic']
}

export type SetListActionType = {
  type: typeof actionTypes.list
  payload: ToolbarStateType['format']['list']
}

export type SetHeaderActionType = {
  type: typeof actionTypes.header
  payload: ToolbarStateType['format']['header']
}

export type SetHandlersActionType = {
  type: typeof actionTypes.handlers
  payload: ToolbarHandlers
}

export type SetDisabled = {
  type: typeof actionTypes.disabled
  payload: boolean
}

export type ToolbarActionsType =
  | SetBoldActionType
  | SetItalicActionType
  | SetListActionType
  | SetHeaderActionType
  | SetHandlersActionType
  | SetDisabled

export type ToolbarReducerType = (
  state: ToolbarStateType,
  action: ToolbarActionsType
) => ToolbarStateType
