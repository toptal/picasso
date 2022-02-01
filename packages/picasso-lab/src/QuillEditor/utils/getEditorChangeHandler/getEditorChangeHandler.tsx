import Quill, { RangeStatic, Sources } from 'quill'

import { initialState } from '../../../TextEditor/store/toolbar'
import { ToolbarStateType } from '../../../TextEditor/store/toolbar/types'
import { EditorChangeHandler } from '../../../TextEditor'

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

const getEditorChangeHandler = (
  quill: Quill,
  handleFormatChange: (format: ToolbarStateType['format']) => void
) => {
  const handler: EditorChangeHandler = (eventName, ...args) => {
    const source = args[2]
    const isSilentEvent = source === 'silent'

    if (isSilentEvent) {
      return
    }

    if (eventName === 'text-change') {
      const format = quill.getFormat() as QuillFormatType

      handleFormatChange(getToolbarStateFromQuillFormat(format))
    }

    if (eventName === 'selection-change') {
      const [range] = args as [RangeStatic, RangeStatic, Sources]

      if (range) {
        const format: QuillFormatType = quill.getFormat(range)

        handleFormatChange(getToolbarStateFromQuillFormat(format))
      } else {
        // when user clicks out of text editor
        handleFormatChange(initialState.format)
      }
    }
  }

  return handler
}

export default getEditorChangeHandler
