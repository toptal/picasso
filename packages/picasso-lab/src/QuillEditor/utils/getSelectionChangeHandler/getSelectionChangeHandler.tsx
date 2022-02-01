import Quill, { SelectionChangeHandler } from 'quill'

import { initialState } from '../../../TextEditor/store/toolbar'
import { ToolbarStateType } from '../../../TextEditor/store/toolbar/types'

type QuillFormatType = {
  bold?: true
  italic?: true
  list?: 'bullet' | 'ordered'
  header?: 3
} | null

const getToolbarStateFromQuillFormat: (
  format: QuillFormatType
) => ToolbarStateType['format'] = format => {
  if (!format) {
    return initialState.format
  }

  return {
    bold: format.bold || false,
    italic: format.italic || false,
    header: format.header ? (String(format.header) as '3') : '',
    list: format.list || false
  }
}

const getSelectionChangeHandler = (
  quill: Quill,
  handleFormatChange: (format: ToolbarStateType['format']) => void
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
      handleFormatChange(initialState.format)
    }
  }

  return handler
}

export default getSelectionChangeHandler
