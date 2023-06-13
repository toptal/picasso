import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { RootNode } from 'lexical'

import noop from '../utils/noop'

export type TextLengthChangeHandler = (length: number) => void

export type Props = {
  /**
   * Callback that is called when text length changes
   */
  onTextLengthChange: TextLengthChangeHandler
}

const LexicalTextLengthPlugin = ({ onTextLengthChange = noop }: Props) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
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

LexicalTextLengthPlugin.displayName = 'LexicalTextLengthPlugin'

export default LexicalTextLengthPlugin
