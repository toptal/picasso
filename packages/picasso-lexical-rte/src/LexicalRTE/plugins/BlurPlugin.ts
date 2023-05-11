import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { COMMAND_PRIORITY_LOW, BLUR_COMMAND } from 'lexical'

type Props = {
  onBlur: () => void
}

const BlurPlugin = ({ onBlur }: Props) => {
  const [editor] = useLexicalComposerContext()

  useEffect(
    () =>
      editor.registerCommand(
        BLUR_COMMAND,
        () => {
          onBlur()

          return false
        },
        COMMAND_PRIORITY_LOW
      ),
    [editor, onBlur]
  )

  return null
}

export default BlurPlugin
