import type { SelectionChangeHandler } from 'quill'
import type Quill from 'quill'

import type { FormatType, SelectionHandler } from '../../types'

const getSelectionChangeHandler = (
  quill: Quill,
  onSelectionChange: SelectionHandler
) => {
  const handler: SelectionChangeHandler = (range, _, source) => {
    const isSilentEvent = source === 'silent'
    const isFromApi = source === 'api'

    if (isSilentEvent) {
      return
    }

    if (isFromApi) {
      return
    }

    if (range) {
      const format = quill.getFormat(range) as FormatType

      onSelectionChange(format)
    }
  }

  return handler
}

export default getSelectionChangeHandler
