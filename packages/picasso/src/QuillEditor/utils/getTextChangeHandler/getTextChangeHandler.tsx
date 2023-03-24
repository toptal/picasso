import Quill, { TextChangeHandler } from 'quill'

import removeClasses from '../remove-classes'
import removeCursorSpan from '../remove-cursor-span'
import quillDecodeIndent from '../quillDecodeIndent'

const getTextChangeHandler = (
  quill: Quill,
  handleTextChange: (html: string) => void
) => {
  const handler: TextChangeHandler = (_, __, source) => {
    const isSilenetEvent = source === 'silent'

    if (isSilenetEvent) {
      return
    }

    const isEmpty = quill.getLength() === 1

    if (isEmpty) {
      handleTextChange('')

      return
    }

    const [cleanValue] = [quill.root.innerHTML]
      .map(quillDecodeIndent)
      .map(removeCursorSpan)
      .map(removeClasses)

    handleTextChange(cleanValue)
  }

  return handler
}

export default getTextChangeHandler
