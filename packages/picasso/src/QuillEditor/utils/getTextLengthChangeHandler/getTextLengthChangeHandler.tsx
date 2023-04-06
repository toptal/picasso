import type { TextChangeHandler } from 'quill'
import type Quill from 'quill'

import type { TextLengthChangeHandler } from '../../types'

const getTextLengthChangeHandler = (
  quill: Quill,
  onTextLengthChange: TextLengthChangeHandler
) => {
  const handler: TextChangeHandler = () => {
    const currentLength = quill.getLength() - 1

    onTextLengthChange(currentLength)
  }

  return handler
}

export default getTextLengthChangeHandler
