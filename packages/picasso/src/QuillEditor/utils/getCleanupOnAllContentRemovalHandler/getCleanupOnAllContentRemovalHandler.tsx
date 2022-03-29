import Quill, { TextChangeHandler } from 'quill'
import Delta from 'quill-delta'

const getCleanupOnAllContentRemovalHandler = (quill: Quill) => {
  const handler: TextChangeHandler = newDelta => {
    const isDeleteOperation = 'delete' in newDelta.ops[0]

    if (!isDeleteOperation) {
      return
    }

    const textLength = quill.getLength() - 1
    const isEditorEmpty = textLength === 0

    if (!isEditorEmpty) {
      return
    }

    const currentFormat = quill.getFormat()
    const isFormatApplied = Object.keys(currentFormat).length > 0

    if (isFormatApplied) {
      quill.setContents(new Delta(), 'api')
    }
  }

  return handler
}

export default getCleanupOnAllContentRemovalHandler
