import Quill from 'quill'

import { FormatType } from '../../types'

export const getFormatChangeHandler = (quill: Quill) => {
  const handler = (e: CustomEvent<FormatType>) => {
    const format = e.detail

    Object.entries(format).forEach(([key, value]) => {
      quill.format(key, value)

      if (key === 'header') {
        setTimeout(() => quill.focus(), 0)
      }
    })
  }

  return handler
}
