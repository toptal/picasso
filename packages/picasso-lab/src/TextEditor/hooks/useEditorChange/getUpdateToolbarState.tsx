import { EditorChangeHandler, RangeStatic, Sources } from 'quill'
import Delta from 'quill-delta'

import {
  EditorRefType,
  ActionCreatorsType,
  ToolbarStateType
} from '../../types'
import { EMPTY_STATE } from '../../constants'

type Props = {
  ref: EditorRefType
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

const getUpdateToolbarState = ({ ref, actions }: Props) => {
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

  const updateToolbarStateHandler: EditorChangeHandler = (
    eventName: 'text-change' | 'selection-change',
    ...args: [Delta | RangeStatic, Delta | RangeStatic, Sources]
  ) => {
    const quill = ref.current
    const source: Sources = args[2]

    if (!quill || source === 'silent') {
      return
    }

    if (eventName === 'text-change') {
      const format: QuillFormatType = quill.getFormat()

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

  return updateToolbarStateHandler
}

export default getUpdateToolbarState
