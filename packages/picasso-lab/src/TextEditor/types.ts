import { ChangeEvent, MouseEventHandler } from 'react'

export type HTMLString = string

export type HeaderValueType = '3' | ''

export type SelectOnChangeHandler = (
  event: ChangeEvent<{
    value: HeaderValueType
  }>
) => void

export type TextEditorChangeHandler = (value: HTMLString) => void

export type ToolbarStateType = {
  header: HeaderValueType
  bold: boolean
  italic: boolean
  list: 'bullet' | 'ordered' | false
}

export type ButtonHandlerType = MouseEventHandler<HTMLButtonElement>

export type ToolbarHandlers = {
  handleHeader: SelectOnChangeHandler
  handleBold: ButtonHandlerType
  handleItalic: ButtonHandlerType
  handleOrdered: ButtonHandlerType
  handleUnordered: ButtonHandlerType
}

export const ActionTypes = {
  bold: 'setBold',
  header: 'setHeader',
  italic: 'setItalic',
  list: 'setList'
} as const

export type SetBoldType = {
  type: 'setBold'
  payload: ToolbarStateType['bold']
}

export type SetItalicType = {
  type: typeof ActionTypes.italic
  payload: ToolbarStateType['italic']
}

export type SetListType = {
  type: typeof ActionTypes.list
  payload: ToolbarStateType['list']
}

export type SetHeaderType = {
  type: typeof ActionTypes.header
  payload: ToolbarStateType['header']
}

export type ActionType =
  | SetBoldType
  | SetItalicType
  | SetListType
  | SetHeaderType

export type SetBoldActionCreator = (payload: ToolbarStateType['bold']) => void
export type SetItalicActionCreator = (
  payload: ToolbarStateType['italic']
) => void
export type SetHeaderActionCreator = (
  payload: ToolbarStateType['header']
) => void
export type SetListActionCreator = (payload: ToolbarStateType['list']) => void

export type ActionCreatorsType = {
  setBold: SetBoldActionCreator
  setItalic: SetItalicActionCreator
  setHeader: SetHeaderActionCreator
  setList: SetListActionCreator
}
