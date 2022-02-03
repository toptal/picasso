import { MouseEventHandler, ChangeEvent } from 'react'

export type HeaderValue = '3' | ''
export type BoldValue = boolean
export type ItalicValue = boolean
export type ListValue = 'bullet' | 'ordered' | false

export type FormatType = {
  bold: BoldValue
  italic: ItalicValue
  list: ListValue
  header: HeaderValue
}

export type ButtonHandlerType = MouseEventHandler<HTMLButtonElement>

export type SelectOnChangeHandler = (
  event: ChangeEvent<{
    value: HeaderValue
  }>
) => void

export type ToolbarHandlers = {
  handleHeader?: SelectOnChangeHandler
  handleBold?: ButtonHandlerType
  handleItalic?: ButtonHandlerType
  handleOrdered?: ButtonHandlerType
  handleUnordered?: ButtonHandlerType
}

export type TextFormatHandler = (
  formatName: 'bold' | 'italic' | 'list' | 'header',
  value: BoldValue | ItalicValue | ListValue | HeaderValue
) => void
export type InitHandler = (props: { toolbarHandlers: ToolbarHandlers }) => void
export type SelectionHandler = (format: FormatType) => void
export type ChangeHandler = (html: string) => void
export type FocusHandler = (isFocused: boolean) => void
