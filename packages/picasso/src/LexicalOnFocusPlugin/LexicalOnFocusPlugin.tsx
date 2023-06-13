import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { COMMAND_PRIORITY_LOW, FOCUS_COMMAND } from 'lexical'

export type Props = {
  onFocus: () => void
}

const LexicalOnFocusPlugin = ({ onFocus }: Props) => {
  const [editor] = useLexicalComposerContext()

  useEffect(
    () =>
      editor.registerCommand(
        FOCUS_COMMAND,
        () => {
          onFocus()

          return false
        },
        COMMAND_PRIORITY_LOW
      ),
    [editor, onFocus]
  )

  return null
}

LexicalOnFocusPlugin.displayName = 'LexicalOnFocusPlugin'

export default LexicalOnFocusPlugin
