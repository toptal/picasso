import Quill, { SelectionChangeHandler } from 'quill'

import { FormatType, QuillFormatType } from '../../types'
import normalizeQuillFormat from '../normalizeQuillFormat'

const getSelectionChangeHandler = (
  quill: Quill,
  handleFormatChange: (format: FormatType) => void
) => {
  const handler: SelectionChangeHandler = (range, oldRange, source) => {
    const isSilentEvent = source === 'silent'

    if (isSilentEvent) {
      return
    }

    if (range) {
      const format: QuillFormatType = quill.getFormat(range)

      handleFormatChange(normalizeQuillFormat(format))
    } else {
      // when user clicks out of text editor
      handleFormatChange({
        bold: false,
        italic: false,
        list: false,
        header: ''
      })
    }
  }

  return handler
}

export default getSelectionChangeHandler
