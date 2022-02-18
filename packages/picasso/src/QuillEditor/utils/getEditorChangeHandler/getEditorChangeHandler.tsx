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
    if (name === 'text-change') {
      const [, , source] = args as TextChangeArgx
      // this event is triggered when format of block element is changed
      // for example from p > h3 | h3 > ol
      const isFromApi = source === 'api'

      if (!isFromApi) {
        return
      }
      const format = quill.getFormat() as FormatType

      onSelectionChange(format)
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
