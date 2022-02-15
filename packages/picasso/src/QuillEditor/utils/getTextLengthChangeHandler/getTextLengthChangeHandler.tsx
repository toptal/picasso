import Quill, { TextChangeHandler } from 'quill'

import { TextLengthChangeHandler } from '../../types'

type Props = {
  quill: Quill
  maxlength?: number
  onTextLengthChange?: TextLengthChangeHandler
}

const getTextLengthChangeHandler = ({
  quill,
  maxlength,
  onTextLengthChange
}: Props) => {
  const handler: TextChangeHandler = (delta, oldContents) => {
    const currentLength = quill.getLength() - 1
    const isOverLimit = maxlength && currentLength > maxlength

    if (onTextLengthChange) {
      if (!maxlength || !isOverLimit) {
        onTextLengthChange(currentLength)
      }
    }

    if (isOverLimit) {
      const selection = quill.getSelection()

      quill.setContents(oldContents, 'silent')

      if (selection) {
        let cursorPositionBeforeRemoval = selection.index - 1

        const wasRemovedNewLine =
          delta.ops[delta.ops.length - 1].insert === '\n'

        if (wasRemovedNewLine) {
          cursorPositionBeforeRemoval = selection.index
        }

        setTimeout(() => quill.setSelection(cursorPositionBeforeRemoval, 0), 0)
      }
    }
  }

  return handler
}

export default getTextLengthChangeHandler
