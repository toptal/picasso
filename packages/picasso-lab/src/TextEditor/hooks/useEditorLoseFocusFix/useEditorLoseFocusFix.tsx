import Quill from 'quill'
import { useEffect } from 'react'

type Props = {
  quill: Quill | undefined
  handler: (this: HTMLDivElement, event: Event) => void
}

const useEditorLooseFocusFix = ({ quill, handler }: Props) => {
  useEffect(() => {
    if (!quill) {
      return
    }
    const toolbarContainer: HTMLDivElement = quill.getModule('toolbar')
      .container

    toolbarContainer.addEventListener('mousedown', handler)

    return () => {
      toolbarContainer.removeEventListener('mousedown', handler)
    }
  }, [handler, quill])
}

export default useEditorLooseFocusFix
