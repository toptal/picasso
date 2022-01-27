import Quill from 'quill'
import { useEffect } from 'react'

const useAutofocus = ({
  autofocus,
  quill
}: {
  autofocus?: boolean
  quill: Quill | undefined
}) => {
  useEffect(() => {
    if (quill && autofocus) {
      quill.focus()
    }
  }, [autofocus, quill])
}

export default useAutofocus
