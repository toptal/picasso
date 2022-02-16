import { useEffect, useState } from 'react'
import Quill, { QuillOptionsStatic, RangeStatic } from 'quill'
import 'quill-paste-smart'

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
  prefix: string
  suffix: string
  collapsed: boolean
  offset: number
  format: { [name: string]: string | number | boolean | undefined }
}

/* eslint-disable func-style */
function removeFormatWhenAllSelected(
  this: { quill: Quill },
  _: RangeStatic,
  { collapsed, offset, suffix, prefix, format }: ContextType
) {
  if (!collapsed && offset === 0 && !suffix && !prefix) {
    // When backspace on the first character of a list,
    // remove the list instead
    Object.keys(format).forEach(key => {
      this.quill.format(key, false, Quill.sources.USER)
    })
  }

  return true
}

export const getModules = (): QuillOptionsStatic['modules'] => {
  return {
    clipboard: {
      matchVisual: false,
      allowed: {
        tags: ['b', 'strong', 'i', 'p', 'br', 'ul', 'ol', 'li', 'h3'],
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
          format: ['list', 'header'],
          handler: removeFormatWhenAllSelected
        },
        customDel: {
          key: 'delete',
          format: ['list', 'header'],
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
