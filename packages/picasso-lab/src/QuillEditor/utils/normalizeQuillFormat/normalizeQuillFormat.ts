import { FormatType, QuillFormatType } from '../../types'

const normalizeQuillFormat: (
  format: QuillFormatType
) => FormatType = format => {
  return {
    bold: format.bold || false,
    italic: format.italic || false,
    header: format.header ? (String(format.header) as '3') : '',
    list: format.list || false
  }
}

export default normalizeQuillFormat
