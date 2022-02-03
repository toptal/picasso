import Quill, { SelectionChangeHandler } from 'quill'

import { FormatType } from '../../types'

type QuillFormatType = {
  bold?: true
  italic?: true
  list?: 'bullet' | 'ordered'
  header?: 3
}

const getToolbarStateFromQuillFormat: (
  format: QuillFormatType
) => FormatType = format => {
  return {
    bold: format.bold || false,
    italic: format.italic || false,
    header: format.header ? (String(format.header) as '3') : '',
    list: format.list || false
  }
}

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

      handleFormatChange(getToolbarStateFromQuillFormat(format))
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
