import { Dispatch, useEffect, useState } from 'react'
import Quill, { QuillOptionsStatic } from 'quill'

import {
  useTypographyClasses,
  makeHeaderFormat,
  makeBoldFormat
} from '../../formats'
import { actions as toolbarActions } from '../../store/toolbar'
import { Props } from '../../TextEditor'
import { ToolbarActionsType, ToolbarStateType } from '../../store/toolbar/types'
import { EditorActionsType } from '../../store/editor/types'
import { ActionsType } from '../../types'

type EditorOptionsType = {
  id: Props['id']
  placeholder?: Props['placeholder']
  dispatch: Dispatch<ActionsType>
}

export const getModules = (
  id: EditorOptionsType['id'],
  dispatch: Dispatch<ToolbarActionsType | EditorActionsType>
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
    },
    keyboard: {
      bindings: {
        bold: {
          key: 'B',
          ctrlKey: true,
          handler: function(
            this: { quill: Quill },
            _: StaticRange,
            context: { format: ToolbarStateType['format'] }
          ) {
            this.quill.format('bold', !context.format.bold)
            toolbarActions.setBold(dispatch)(!context.format.bold)
          }
        },
        italic: {
          key: 'I',
          ctrlKey: true,
          handler: function(
            this: { quill: Quill },
            _: StaticRange,
            context: { format: ToolbarStateType['format'] }
          ) {
            this.quill.format('italic', !context.format.italic)
            toolbarActions.setItalic(dispatch)(!context.format.italic)
          }
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
  placeholder,
  dispatch
}: EditorOptionsType): Quill | undefined => {
  const [quill, setQuill] = useState<Quill>()
  const typographyClasses = useTypographyClasses()

  useEffect(() => {
    Quill.register(makeHeaderFormat(typographyClasses), true)
    Quill.register(makeBoldFormat(typographyClasses), true)

    setQuill(
      new Quill(`#${id}`, {
        modules: getModules(id, dispatch),
        formats,
        placeholder
      })
    )
  }, [typographyClasses, id, dispatch, placeholder])

  return quill
}

export default useQuillInstance
