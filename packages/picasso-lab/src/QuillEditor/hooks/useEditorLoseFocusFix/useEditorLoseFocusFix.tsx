import Quill from 'quill'
import { useEffect } from 'react'

type Props = {
  quill?: Quill
  id: string
}

const useEditorLooseFocusFix = ({ quill, id }: Props) => {
  useEffect(() => {
    if (!quill) {
      return
    }
    const handler: (this: Element, event: Event) => void = event => {
      event.preventDefault()
    }

    const toolbarContainer = document.getElementById(`${id}toolbar`)

    if (toolbarContainer) {
      toolbarContainer.addEventListener('mousedown', handler)

      return () => {
        toolbarContainer.removeEventListener('mousedown', handler)
      }
    }
  }, [quill, id])
}

export default useEditorLooseFocusFix
