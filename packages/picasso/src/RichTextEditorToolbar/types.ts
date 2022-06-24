import { ChangeEvent, MouseEventHandler } from 'react'

export type HeaderValue = '3' | ''
export type BoldValue = boolean
export type ItalicValue = boolean
export type ListValue = 'bullet' | 'ordered' | false
export type LinkValue = string

export type FormatType = {
  bold: BoldValue
  italic: ItalicValue
  list: ListValue
  header: HeaderValue
  link: LinkValue
}

export type ButtonHandlerType = MouseEventHandler<HTMLButtonElement>

export type SelectOnChangeHandler = (
  event: ChangeEvent<{
    value: HeaderValue
  }>
) => void
