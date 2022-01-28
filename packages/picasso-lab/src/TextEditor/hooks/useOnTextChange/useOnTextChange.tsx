import { useEffect } from 'react'
import Quill, { TextChangeHandler } from 'quill'

const useOnTextChange = ({
  quill,
  handler
}: {
  quill: Quill
  handler: TextChangeHandler
}) => {
  useEffect(() => {
    quill.on('text-change', handler)

    return () => {
      quill.off('text-change', handler)
    }
  }, [quill, handler])
}

export default useOnTextChange
