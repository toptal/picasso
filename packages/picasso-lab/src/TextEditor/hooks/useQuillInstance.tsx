import { useEffect, useRef } from 'react'
import Quill, { QuillOptionsStatic } from 'quill'

import {
  useTypographyClasses,
  makeHeaderFormat,
  makeBoldFormat
} from '../formats'
import { EditorRefType } from '../types'
import { Props } from '../TextEditor'

type EditorOptionsType = {
  id: Props['id']
  placeholder?: Props['placeholder']
}

const getModules = (
  id: EditorOptionsType['id']
): QuillOptionsStatic['modules'] => {
  return {
    // tools we provide to format text
    // https://quilljs.com/docs/modules/toolbar/
    toolbar: {
      // There is issue in quill which does not allow us to have multiple
      // editors with single toolbar on the page:
      // https://github.com/quilljs/quill/issues/633 So, I've added unique id
      // for each of them (using class selector does not work either, custom
      // toolbar is still applied on the first editor)
      container: `#${id}toolbar`
    },
    clipboard: {
      matchVisual: false
    }
  }
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

const useQuillInstance = ({
  id,
  placeholder
}: EditorOptionsType): EditorRefType => {
  const ref = useRef<Quill>()
  const typographyClasses = useTypographyClasses()

  useEffect(() => {
    Quill.register(makeHeaderFormat(typographyClasses), true)
    Quill.register(makeBoldFormat(typographyClasses), true)

    ref.current = new Quill(`#${id}`, {
      modules: getModules(id),
      formats,
      placeholder
    })
  }, [id, placeholder, ref, typographyClasses])

  return ref
}

export default useQuillInstance
