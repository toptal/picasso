import Quill from 'quill'
import { useEffect } from 'react'

const useDisabledEditor = ({
  disabled,
  quill,
}: {
  disabled: boolean
  quill?: Quill
}) => {
  useEffect(() => {
    if (!quill) {
      return
    }

    quill.enable(!disabled)
  }, [disabled, quill])
}

export default useDisabledEditor
