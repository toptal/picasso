import Quill from 'quill'

import { FormatType } from '../../types'

export const getFormatChangeHandler = (quill: Quill) => {
  const handler = (e: CustomEvent<FormatType>) => {
    const format = e.detail

    quill.format('bold', format.bold)
    quill.format('italic', format.italic)
    quill.format('list', format.list)
    quill.format('header', format.header)
  }

  return handler
}
