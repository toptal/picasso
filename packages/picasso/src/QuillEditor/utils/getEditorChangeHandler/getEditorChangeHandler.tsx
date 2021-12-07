import Quill, { RangeStatic, Sources } from 'quill'
import Delta from 'quill-delta'

import { FormatType } from '../../types'

type SelectionChangeArgs = [RangeStatic, RangeStatic, Sources]
type TextChangeArgx = [Delta, Delta, Sources]

const getEditorChangeHandler = (
  quill: Quill,
  onSelectionChange: (format: FormatType) => void
) => {
  const handler = (
    name: 'text-change' | 'selection-change',
    ...args: SelectionChangeArgs | TextChangeArgx
  ) => {
    if (!quill) {
      return
    }

    if (name === 'selection-change') {
      const [range, , source] = args as SelectionChangeArgs

      if (source === 'silent') {
        const format = quill.getFormat(range || undefined) as FormatType

        onSelectionChange(format)
      }
    }
  }

  return handler
}

export default getEditorChangeHandler
