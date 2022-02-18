import { useEffect, useState } from 'react'
import Quill, { QuillOptionsStatic, RangeStatic } from 'quill'
import 'quill-paste-smart'
import Delta from 'quill-delta'

import {
  useTypographyClasses,
  makeHeaderFormat,
  makeBoldFormat
} from '../../formats'

export type EditorOptionsType = {
  id: string
  placeholder?: string
}

type ContextType = {
  /**
   * If true, handler is called only if the user’s selection is collapsed,
   * i.e. in cursor form. If false, the users’s selection must be non-zero length,
   * such as when the user has highlighted text.
   */
  collapsed: boolean
}

/* eslint-disable func-style */
function removeFormatWhenAllSelected(
  this: { quill: Quill },
  _: RangeStatic,
  { collapsed }: ContextType
) {
  const isUserSelectionNonZero = !collapsed
  const textLength = this.quill.getLength() - 1
  const selection = this.quill.getSelection()
  const isSelectedEverything = textLength === selection?.length

  if (isUserSelectionNonZero && isSelectedEverything) {
    this.quill.setContents(new Delta(), Quill.sources.USER)
  } else {
    // Otherwise propogate to Quill's default
    return true
  }
}

export const getModules = (): QuillOptionsStatic['modules'] => {
  return {
    clipboard: {
      matchVisual: false,
      allowed: {
        // unsupported tags will be also removed on BE side, so before extending
        // make sure, that our API supports new type
        tags: ['b', 'strong', 'i', 'em', 'p', 'br', 'ul', 'ol', 'li', 'h3'],
        attributes: []
      },
      keepSelection: true,
      substituteBlockElements: true
    },
    keyboard: {
      // we need to specify default bindings
      // because Quill don't allow us to setup bindings via
      // quill.keyboard.addBinding for default Quill
      // key shortcuts otherwise
      bindings: {
        bold: {
          key: 'B',
          metaKey: true,
          ctrlKey: true,
          handler: function () {}
        },
        italic: {
          key: 'I',
          metaKey: true,
          ctrlKey: true,
          handler: function () {}
        },
        customBackspace: {
          key: 'backspace',
          handler: removeFormatWhenAllSelected
        },
        customDel: {
          key: 'delete',
          handler: removeFormatWhenAllSelected
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
