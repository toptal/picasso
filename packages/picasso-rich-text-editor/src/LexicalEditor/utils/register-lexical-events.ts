import { COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND } from 'lexical'
import type { LexicalEditor } from 'lexical'

export type LexicalRegisterParams = {
  editor: LexicalEditor
  updateToolbar: () => void
}

// Subscribes to Lexical editor events and updates the toolbar state accordingly
export const registerLexicalEvents = ({
  editor,
  updateToolbar,
}: LexicalRegisterParams) => {
  const editorListenerCleanup = editor.registerUpdateListener(
    ({ editorState }) => {
      editorState.read(() => {
        updateToolbar()
      })
    }
  )
  const editorCommandsCleanup = editor.registerCommand(
    SELECTION_CHANGE_COMMAND,
    () => {
      updateToolbar()

      return false
    },
    COMMAND_PRIORITY_CRITICAL
  )

  // Cleanup is necessary to avoid listeners piling up with useEffect
  return () => {
    editorListenerCleanup()
    editorCommandsCleanup()
  }
}
