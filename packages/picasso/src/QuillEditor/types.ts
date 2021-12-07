export type BoldValue = boolean | undefined
export type ItalicValue = boolean | undefined
export type ListValue = 'bullet' | 'ordered' | undefined
export type HeaderValue = 3 | undefined

export type FormatType = {
  bold: BoldValue
  italic: ItalicValue
  list: ListValue
  header: HeaderValue
}

export type TextFormatHandlerEvent =
  | { formatName: 'bold'; value: BoldValue }
  | { formatName: 'italic'; value: ItalicValue }
  | { formatName: 'list'; value: ListValue }
  | { formatName: 'header'; value: HeaderValue }

export type TextFormatHandler = (e: TextFormatHandlerEvent) => void
export type SelectionHandler = (format: FormatType) => void
export type ChangeHandler = (html: string) => void
export type TextLengthChangeHandler = (length: number) => void
