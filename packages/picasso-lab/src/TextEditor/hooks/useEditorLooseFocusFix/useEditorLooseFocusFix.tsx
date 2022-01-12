import { useEffect } from 'react'

import { EditorRefType } from '../../types'

type Props = {
  ref: EditorRefType
  handler: (this: Element, event: MouseEvent) => void
}

const useEditorLooseFocusFix = ({ ref, handler }: Props) => {
  useEffect(() => {
    const quill = ref.current

    if (!quill) {
      return
    }

    const toolbarContainer: Element = quill.getModule('toolbar').container

    toolbarContainer.addEventListener('mousedown', handler)

    return () => {
      toolbarContainer.removeEventListener('mousedown', handler)
    }
  }, [handler, ref])
}

export default useEditorLooseFocusFix
