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
