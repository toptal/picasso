import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getRoot, RootNode } from 'lexical'
import { noop } from '@toptal/picasso-utils'

export type TextLengthChangeHandler = (length: number) => void

export type Props = {
  /**
   * Callback that is called when text length changes
   */
  onTextLengthChange: TextLengthChangeHandler
}

const TextLengthPlugin = ({ onTextLengthChange = noop }: Props) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    // Set initial text length on mount
    editor.getEditorState().read(() => {
      const rootNode = $getRoot()
      const initialTextContentSize = rootNode.getTextContentSize()

      onTextLengthChange(initialTextContentSize)
    })

    return editor.registerNodeTransform(RootNode, (rootNode: RootNode) => {
      const prevTextContentSize = editor
        .getEditorState()
        .read(() => rootNode.getTextContentSize())
      const textContentSize = rootNode.getTextContentSize()

      if (prevTextContentSize !== textContentSize) {
        onTextLengthChange(textContentSize)
      }
    })
  }, [editor, onTextLengthChange])

  return null
}

TextLengthPlugin.displayName = 'LexicalTextLengthPlugin'

export default TextLengthPlugin
