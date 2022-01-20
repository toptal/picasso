import { MutableRefObject, ChangeEvent, MouseEventHandler } from 'react'
import Quill from 'quill'

export type EditorRefType = MutableRefObject<Quill | undefined>

export type HTMLString = string

export type HeaderValueType = '3' | ''

export type SelectOnChangeHandler = (
  event: ChangeEvent<{
    value: HeaderValueType
  }>
) => void

export type TextEditorChangeHandler = (value: HTMLString) => void

export type ToolbarStateType = {
  header?: HeaderValueType
  bold?: boolean
  italic?: boolean
  list?: 'bullet' | 'ordered'
}

export type ButtonHandlerType = MouseEventHandler<HTMLButtonElement>

export type ToolbarHandlers = {
  handleHeader: SelectOnChangeHandler
  handleBold: ButtonHandlerType
  handleItalic: ButtonHandlerType
  handleOrdered: ButtonHandlerType
  handleUnordered: ButtonHandlerType
}

export type SetAllAction = {
  type: 'setAll'
  payload: ToolbarStateType
}

export type SetAction<
  T extends keyof ToolbarStateType = keyof ToolbarStateType
> = {
  type: 'set'
  key: T
  payload: ToolbarStateType[T]
}

export type ActionType = SetAllAction | SetAction

export type SetToolbarStateType = (payload: ToolbarStateType) => void

export type SetToolbarStateKeyType = <T extends keyof ToolbarStateType>(
  key: SetAction<T>['key'],
  payload: SetAction<T>['payload']
) => void

export type ActionsType = {
  setToolbarState: SetToolbarStateType
  setToolbarStateKey: SetToolbarStateKeyType
}
