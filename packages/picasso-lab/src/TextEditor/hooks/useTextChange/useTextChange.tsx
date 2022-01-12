import { useEffect } from 'react'
import { TextChangeHandler } from 'quill'

import { EditorRefType } from '../../types'

const useTextChange = ({
  ref,
  handler
}: {
  ref: EditorRefType
  handler: TextChangeHandler
}) => {
  useEffect(() => {
    const quill = ref.current

    if (quill) {
      quill.on('text-change', handler)

      return () => {
        quill.off('text-change', handler)
      }
    }
  }, [ref, handler])
}

export default useTextChange
