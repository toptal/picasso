import { useEffect } from 'react'

import type { EditorRefType } from '../types'

const useDisableEditor = ({
  disabled,
  ref
}: {
  disabled?: boolean
  ref: EditorRefType
}) => {
  useEffect(() => {
    const quill = ref.current

    if (quill) {
      quill.enable(!disabled)
    }
  }, [disabled, ref])
}

export default useDisableEditor
