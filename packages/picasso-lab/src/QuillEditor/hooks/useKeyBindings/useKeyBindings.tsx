import Quill from 'quill'
import { useEffect } from 'react'

const useKeyBindings = ({
  quill,
  handleTextFormat
}: {
  quill?: Quill
  handleTextFormat: (formatType: 'bold' | 'italic', value: boolean) => void
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
