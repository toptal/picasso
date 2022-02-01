import {
  removeClasses,
  removeCursorSpan
} from '@toptal/picasso-lab/TextEditor/utils'
import Quill, { TextChangeHandler } from 'quill'

const getTextChangeHandler = (
  quill: Quill,
  handleTextChange: (html: string) => void
) => {
  const handler: TextChangeHandler = (_, __, source) => {
    const isSilenetEvent = source === 'silent'

    if (isSilenetEvent) {
      return
    }

    const [cleanValue] = [quill.root.innerHTML]
      .map(removeCursorSpan)
      .map(removeClasses)

    handleTextChange(cleanValue)
  }

  return handler
}

export default getTextChangeHandler
