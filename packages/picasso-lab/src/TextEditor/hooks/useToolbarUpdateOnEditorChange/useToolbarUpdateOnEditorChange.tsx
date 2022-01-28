import Quill, { RangeStatic, Sources } from 'quill'

import {
  ActionCreatorsType,
  ToolbarStateType,
  EditorChangeHandler
} from '../../types'
import { EMPTY_STATE } from '../../constants'
import useOnEditorChange from '../useOnEditorChange'

type Props = {
  quill: Quill
  actions: ActionCreatorsType
}

type QuillFormatType = {
  bold?: true
  italic?: true
  list?: 'bullet' | 'ordered'
  header?: 3
} | null

const getToolbarStateFromQuillFormat: (
  format: QuillFormatType
) => ToolbarStateType = format => {
  if (!format) {
    return EMPTY_STATE
  }

  return {
    bold: format.bold || false,
    italic: format.italic || false,
    header: format.header ? (String(format.header) as '3') : '',
    list: format.list || false
  }
}

const useToolbarStateUpdateOnChange = ({ quill, actions }: Props) => {
  const updateToolbarState = ({
    bold,
    italic,
    header,
    list
  }: ToolbarStateType) => {
    actions.setBold(bold)
    actions.setItalic(italic)
    actions.setHeader(header)
    actions.setList(list)
  }

  const handleStateUpdate: EditorChangeHandler = (eventName, ...args) => {
    const source = args[2]
    const isSilentEvent = source === 'silent'

    if (isSilentEvent) {
      return
    }

    if (eventName === 'text-change') {
      const format = quill.getFormat() as QuillFormatType

      updateToolbarState(getToolbarStateFromQuillFormat(format))
    }

    if (eventName === 'selection-change') {
      const [range] = args as [RangeStatic, RangeStatic, Sources]

      if (range) {
        const format: QuillFormatType = quill.getFormat(range)

        updateToolbarState(getToolbarStateFromQuillFormat(format))
      } else {
        // when user clicks out of text editor
        updateToolbarState(EMPTY_STATE)
      }
    }
  }

  useOnEditorChange({ quill, handler: handleStateUpdate })
}

export default useToolbarStateUpdateOnChange
