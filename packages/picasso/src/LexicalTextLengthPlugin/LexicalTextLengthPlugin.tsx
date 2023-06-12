import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isRangeSelection, RootNode } from 'lexical'

import noop from '../utils/noop'

export type TextLengthChangeHandler = (length: number) => void

export type Props = {
  /**
   * Callback that is called when text length changes
   */
  onTextLengthChange: TextLengthChangeHandler
}

const LexicalTextLengthPlugin = ({ onTextLengthChange }: Props) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerNodeTransform(RootNode, (rootNode: RootNode) => {
      const selection = $getSelection()

      if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
        return
      }

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

LexicalTextLengthPlugin.defaultProps = {
  onTextLengthChange: noop,
}

LexicalTextLengthPlugin.displayName = 'LexicalTextLengthPlugin'

export default LexicalTextLengthPlugin
