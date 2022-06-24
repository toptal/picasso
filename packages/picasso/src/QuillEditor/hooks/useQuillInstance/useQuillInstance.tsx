import { useEffect, useState } from 'react'
import Quill, { QuillOptionsStatic } from 'quill'
import 'quill-paste-smart'

import {
  useTypographyClasses,
  makeHeaderFormat,
  makeBoldFormat,
  makeLinkFormat,
} from '../../formats'
import type { EditorPlugin } from '../../types'

export type EditorOptionsType = {
  id: string
  placeholder?: string
  plugins?: EditorPlugin[]
}

export const getModules = (
  plugins: EditorOptionsType['plugins']
): QuillOptionsStatic['modules'] => {
  const allowLinks = plugins?.includes('link')

  const allowedTags = [
    'b',
    'strong',
    'i',
    'em',
    'p',
    'br',
    'ul',
    'ol',
    'li',
    'h3',
  ]
  const allowedAttributes = []

  if (allowLinks) {
    allowedTags.push('a')
    allowedAttributes.push('href')
  }

  return {
    clipboard: {
      matchVisual: false,
      allowed: {
        // unsupported tags will be also removed on BE side, so before extending
        // make sure, that our API supports new type
        tags: allowedTags,
        attributes: allowedAttributes,
      },
      keepSelection: true,
      substituteBlockElements: true,
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
          handler: function () {},
        },
        italic: {
          key: 'I',
          metaKey: true,
          ctrlKey: true,
          handler: function () {},
        },
      },
    },
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
  'list',
]

const Inline = Quill.import('blots/inline')

// We need link to be wrapped by other inline HTML tags to keep proper styling
// Lower index means deeper in the DOM tree, since not found (-1) is for embeds
Inline.order = [
  'cursor',
  'link',
  'inline', // Must be lower
  'underline',
  'strike',
  'italic',
  'bold',
  'script',
  'code', // Must be higher
]

const useQuillInstance = ({
  id,
  placeholder,
  plugins,
}: EditorOptionsType): Quill | undefined => {
  const [quill, setQuill] = useState<Quill>()
  const typographyClasses = useTypographyClasses()

  useEffect(() => {
    const extendedFormats: QuillOptionsStatic['formats'] = [...formats]

    Quill.register(makeHeaderFormat(typographyClasses), true)
    Quill.register(makeBoldFormat(typographyClasses), true)

    const allowLinks = plugins?.includes('link')

    if (allowLinks) {
      Quill.register(makeLinkFormat(typographyClasses), true)
      extendedFormats.push('link')
    }

    setQuill(
      new Quill(`#${id}`, {
        modules: getModules(plugins),
        formats: extendedFormats,
        placeholder,
      })
    )
  }, [typographyClasses, id, placeholder, plugins])

  return quill
}

export default useQuillInstance
