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

export type QuillFormatType = {
  bold?: true
  italic?: true
  list?: 'bullet' | 'ordered'
  header?: 3
}

export type TextFormatHandler = (
  formatName: 'bold' | 'italic' | 'list' | 'header',
  value: BoldValue | ItalicValue | ListValue | HeaderValue
) => void
export type SelectionHandler = (format: FormatType) => void
export type ChangeHandler = (html: string) => void
