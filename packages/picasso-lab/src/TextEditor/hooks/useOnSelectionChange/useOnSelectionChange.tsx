import { useEffect } from 'react'
import Quill, { SelectionChangeHandler } from 'quill'

const useOnSelectionChange = ({
  quill,
  handler
}: {
  quill: Quill
  handler: SelectionChangeHandler
}) => {
  useEffect(() => {
    quill.on('selection-change', handler)

    return () => {
      quill.off('selection-change', handler)
    }
  }, [quill, handler])
}

export default useOnSelectionChange
