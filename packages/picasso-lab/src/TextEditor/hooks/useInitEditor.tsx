import { useEffect } from 'react'
import Quill, { QuillOptionsStatic } from 'quill'

import { EditorRefType } from '../types'
import { Props } from '../TextEditor'
import {
  useTypographyStyles,
  makeHeaderFormat,
  makeBoldFormat
} from '../formats'

type EditorOptionsType = {
  id: Props['id']
  placeholder?: Props['placeholder']
}

const modules: QuillOptionsStatic['modules'] = {
  // tools we provide to format text
  // https://quilljs.com/docs/modules/toolbar/
  toolbar: [
    [{ header: [3, false] }],
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
  { id, placeholder }: EditorOptionsType
) => {
  const typographyStyles = useTypographyStyles()

  useEffect(() => {
    Quill.register(makeHeaderFormat(typographyStyles), true)
    Quill.register(makeBoldFormat(typographyStyles), true)

    editorRef.current = new Quill(`#${id}`, {
      modules,
      formats,
      theme: 'snow',
      placeholder
    })
  }, [id, placeholder, editorRef, typographyStyles])
}

export default useInitEditor
