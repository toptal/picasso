import { useEffect } from 'react'
import Quill, { QuillOptionsStatic } from 'quill'

import type { EditorRefType, EditorOptionsType } from '../types'

const modules: QuillOptionsStatic['modules'] = {
  // tools we provide to format text
  // https://quilljs.com/docs/modules/toolbar/
  toolbar: [
    [{ header: [2, false] }], // TODO check what header we support
    ['bold', 'italic'],
    [{ list: 'ordered' }, { list: 'bullet' }]
  ]
}

/**
 * Formats we allow to paste into editor
 *
 * This is separate from adding a control in the Toolbar.
 * For example, you can configure Quill to allow bolded
 * content to be pasted into an editor that has no bold
 * button in the toolbar. */
const formats: QuillOptionsStatic['formats'] = [
  'bold',
  'italic',
  'header',
  'list'
]

const useInitEditor = (
  editorRef: EditorRefType,
  { id, placeholder, onChange }: EditorOptionsType
) => {
  useEffect(() => {
    editorRef.current = new Quill(`#${id}`, {
      modules,
      formats,
      theme: 'snow',
      placeholder
    })
  }, [id, placeholder, onChange, editorRef])
}

export default useInitEditor
