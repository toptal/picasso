import { useEffect, useState } from 'react'
import type { QuillOptionsStatic, RangeStatic } from 'quill'
import Quill from 'quill'
import 'quill-paste-smart'

import { makeHeaderFormat, makeBoldFormat, makeLinkFormat } from '../../formats'
import type { EditorPlugin } from '../../types'
import { EmojiBlot } from '../../blots/emoji'

export type EditorOptionsType = {
  id: string
  placeholder?: string
  plugins?: EditorPlugin[]
}

export const getModules = (
  plugins: EditorOptionsType['plugins']
): QuillOptionsStatic['modules'] => {
  const allowLinks = plugins?.includes('link')
  const allowEmojis = plugins?.includes('emoji')

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
  const allowedAttributes = ['class']

  if (allowLinks) {
    allowedTags.push('a')
    allowedAttributes.push('href')
  }

  if (allowEmojis) {
    allowedTags.push('img')
    allowedAttributes.push('src', 'data-src', 'data-emoji-name', 'class')
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
        indent: {
          key: 'Tab',
          format: ['blockquote', 'indent', 'list'],
          handler: function (
            this: { quill: Quill },
            range: RangeStatic,
            context: {
              collapsed: boolean
              empty: boolean
              offset: number
              format: { [key: string]: string }
              prefix: string
              suffix: string
            }
          ) {
            if (context.collapsed && context.offset !== 0) {
              return true
            }

            const { quill } = this
            const { format } = context
            const currentIndent = format.indent || 0
            const [line] = quill.getLine(range.index)
            const prevLine = line.prev

            const isPrevLineListItem = prevLine?.domNode?.tagName === 'LI'
            const prevIndent =
              prevLine?.domNode?.className?.match(/\d+/)?.[0] || 0

            if (
              isPrevLineListItem &&
              currentIndent <= prevIndent &&
              Number(currentIndent) < 4
            ) {
              quill.format('indent', '+1', 'user')
            }
          },
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
  'indent',
]

const Inline = Quill.import('blots/inline')

// We need link to be wrapped by other inline HTML tags to keep proper styling
// Lower index means deeper in the DOM tree, since not found (-1) is for embeds
Inline.order = [
  'cursor',
  'emojiBlot',
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
  // @todo remove it in a separate task
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const typographyClasses = useTypographyClasses()

  useEffect(() => {
    const extendedFormats: QuillOptionsStatic['formats'] = [...formats]

    Quill.register(makeHeaderFormat(typographyClasses), true)
    Quill.register(makeBoldFormat(typographyClasses), true)

    const allowEmojis = plugins?.includes('emoji')

    if (allowEmojis) {
      Quill.register({ 'formats/emojiBlot': EmojiBlot }, true)
      extendedFormats.push('image', 'emojiBlot')
    }

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
