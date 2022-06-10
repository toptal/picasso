import Quill from 'quill'
import { useEffect } from 'react'

const useFocus = ({
  isFocused,
  quill,
}: {
  isFocused: boolean
  quill?: Quill
}) => {
  useEffect(() => {
    if (!quill) {
      return
    }

    if (isFocused) {
      quill.focus()
    }
  }, [quill, isFocused])
}

export default useFocus
