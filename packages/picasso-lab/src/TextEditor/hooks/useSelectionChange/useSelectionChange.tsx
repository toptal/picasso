import { useEffect } from 'react'
import Quill, { SelectionChangeHandler } from 'quill'

const useSelectionChange = ({
  quill,
  handler
}: {
  quill: Quill | undefined
  handler: SelectionChangeHandler
}) => {
  useEffect(() => {
    if (quill) {
      quill.on('selection-change', handler)

      return () => {
        quill.off('selection-change', handler)
      }
    }
  }, [quill, handler])
}

export default useSelectionChange
