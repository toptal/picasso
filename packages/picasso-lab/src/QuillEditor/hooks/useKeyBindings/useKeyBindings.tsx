import Quill from 'quill'
import { useEffect } from 'react'

import { TextFormatHandler } from '../../types'

const useKeyBindings = ({
  quill,
  handleTextFormat
}: {
  quill?: Quill
  handleTextFormat: TextFormatHandler
}) => {
  useEffect(() => {
    if (!quill) {
      return
    }

    quill.keyboard.addBinding(
      {
        key: 'B',
        shortKey: true
      },
      function (range, context) {
        const isBold = context.format.bold

        quill.format('bold', !isBold)
        handleTextFormat('bold', !isBold)
      }
    )

    quill.keyboard.addBinding(
      {
        key: 'I',
        shortKey: true
      },
      function (range, context) {
        const isItalic = context.format.italic

        quill.format('italic', !isItalic)
        handleTextFormat('italic', !isItalic)
      }
    )
  }, [quill, handleTextFormat])
}

export default useKeyBindings
