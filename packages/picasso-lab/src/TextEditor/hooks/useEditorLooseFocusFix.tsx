import { useEffect, useCallback } from 'react'

import { EditorRefType } from '../types'

const useEditorLooseFocusFix = ({ ref }: { ref: EditorRefType }) => {
  const preventDefault: (this: Element, event: Event) => void = useCallback(
    event => {
      event.preventDefault()
    },
    []
  )

  useEffect(() => {
    const quill = ref.current

    if (!quill) {
      return
    }

    const toolbarContainer: Element = quill.getModule('toolbar').container

    toolbarContainer.addEventListener('mousedown', preventDefault)

    return () => {
      toolbarContainer.removeEventListener('mousedown', preventDefault)
    }
  }, [preventDefault, ref])
}

export default useEditorLooseFocusFix
