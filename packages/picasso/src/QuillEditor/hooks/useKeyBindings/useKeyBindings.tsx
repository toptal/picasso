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

        quill.format('bold', !isBold)
        onTextFormat({
          formatName: 'bold',
          value: !isBold
        })
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
        onTextFormat({
          formatName: 'italic',
          value: !isItalic
        })
      }
    )
  }, [quill, onTextFormat])
}

export default useKeyBindings
