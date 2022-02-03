import Quill from 'quill'
import { useEffect } from 'react'

import { TextFormatHandler } from '../../types'

const useKeyBindings = ({
  quill,
  onTextFormat
}: {
  quill?: Quill
  onTextFormat: TextFormatHandler
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

        onTextFormat('bold', !isBold)
      }
    )

    quill.keyboard.addBinding(
      {
        key: 'I',
        shortKey: true
      },
      function (range, context) {
        const isItalic = context.format.italic

        onTextFormat('italic', !isItalic)
      }
    )
  }, [quill, onTextFormat])
}

export default useKeyBindings
