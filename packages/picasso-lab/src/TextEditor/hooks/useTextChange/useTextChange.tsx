import { useEffect } from 'react'
import Quill, { TextChangeHandler } from 'quill'

const useTextChange = ({
  quill,
  handler
}: {
  quill: Quill | undefined
  handler: TextChangeHandler
}) => {
  useEffect(() => {
    if (!quill) {
      return
    }
    quill.on('text-change', handler)

    return () => {
      quill.off('text-change', handler)
    }
  }, [quill, handler])
}

export default useTextChange
