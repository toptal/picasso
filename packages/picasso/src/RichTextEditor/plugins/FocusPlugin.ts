import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { COMMAND_PRIORITY_LOW, FOCUS_COMMAND } from 'lexical'

type Props = {
  onFocus: () => void
}

const FocusPlugin = ({ onFocus }: Props) => {
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

export default FocusPlugin
