import { useEffect, useState } from 'react'
import Quill, { QuillOptionsStatic } from 'quill'

import {
  useTypographyClasses,
  makeHeaderFormat,
  makeBoldFormat
} from '../../formats'

export type EditorOptionsType = {
  id: string
  placeholder?: string
}

export const getModules = (): QuillOptionsStatic['modules'] => {
  return {
    clipboard: {
      matchVisual: false
    },
    keyboard: {
      bindings: {
        bold: {
          key: 'B',
          ctrlKey: true,
          // handler: function(
          //   this: { quill: Quill },
          //   _: StaticRange,
          //   context: { format: ToolbarStateType['format'] }
          // ) {
          //   this.quill.format('bold', !context.format.bold)
          //   toolbarActions.setBold(dispatch)(!context.format.bold)
          // }
        },
        italic: {
          key: 'I',
          ctrlKey: true,
          // handler: function(
          //   this: { quill: Quill },
          //   _: StaticRange,
          //   context: { format: ToolbarStateType['format'] }
          // ) {
          //   this.quill.format('italic', !context.format.italic)
          //   toolbarActions.setItalic(dispatch)(!context.format.italic)
          // }
        }
      }
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
}: EditorOptionsType): Quill | undefined => {
  const [quill, setQuill] = useState<Quill>()
  const typographyClasses = useTypographyClasses()

  useEffect(() => {
    Quill.register(makeHeaderFormat(typographyClasses), true)
    Quill.register(makeBoldFormat(typographyClasses), true)

    setQuill(
      new Quill(`#${id}`, {
        modules: getModules(),
        formats,
        placeholder
      })
    )
  }, [typographyClasses, id, placeholder])

  return quill
}

export default useQuillInstance
