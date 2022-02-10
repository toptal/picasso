import {
  FormatType as EditorFormatType,
  BoldValue as EditorBoldValue,
  ItalicValue as EditorItalicValue,
  ListValue as EditorListValue,
  HeaderValue as EditorHeaderValue
} from '../../QuillEditor'
import { FormatType as ToolbarFormatType, HeaderValue } from '../store/toolbar'

export const convertBoldFromEditorValue = (bold: EditorBoldValue) =>
  bold || false
export const convertItalicFromEditorValue = (italic: EditorItalicValue) =>
  italic || false
export const convertListFromEditorValue = (list: EditorListValue) =>
  list || false
export const convertHeaderFromEditorValue = (header: EditorHeaderValue) =>
  header ? '3' : ''

export const getToolbarFormatFromEditorFormat = (
  format: EditorFormatType
): ToolbarFormatType => {
  return {
    bold: convertBoldFromEditorValue(format.bold),
    italic: convertItalicFromEditorValue(format.italic),
    list: convertListFromEditorValue(format.list),
    header: convertHeaderFromEditorValue(format.header)
  }
}

export const convertHeaderToEditorValue = (
  header: HeaderValue
): EditorHeaderValue => {
  if (header === '') {
    return undefined
  }

  return 3
}
