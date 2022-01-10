import { MutableRefObject, ChangeEvent, MouseEventHandler } from 'react'
import Quill from 'quill'

export type EditorRefType = MutableRefObject<Quill | undefined>

export type HTMLString = string

export type HeaderValueType = 3 | undefined

export type SelectOnChangeHandler = (
  event: ChangeEvent<{
    value: HeaderValueType
  }>
) => void

export type TextEditorChangeHandler = (value: HTMLString) => void

export type ToolbarStateType = {
  header?: HeaderValueType
  bold?: true
  italic?: true
  list?: 'bullet' | 'ordered'
}

export type ToolbarHandlers = {
  handleHeader: SelectOnChangeHandler
  handleBold: MouseEventHandler<HTMLButtonElement>
  handleItalic: MouseEventHandler<HTMLButtonElement>
  handleOrdered: MouseEventHandler<HTMLButtonElement>
  handleUnordered: MouseEventHandler<HTMLButtonElement>
}
