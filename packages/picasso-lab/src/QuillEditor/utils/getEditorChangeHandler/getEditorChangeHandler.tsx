import Quill from 'quill'

import { FormatType } from '../../types'

const getEditorChangeHandler = (
  quill: Quill,
  onSelectionChange: (format: FormatType) => void
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handler = (name: 'text-change' | 'selection-change', ...args: any) => {
    if (!quill) {
      return
    }

    if (name === 'selection-change') {
      const [range, , source] = args

      if (source === 'silent') {
        const format = quill.getFormat(range) as FormatType

        onSelectionChange(format)
      }
    }
  }

  return handler
}

export default getEditorChangeHandler
