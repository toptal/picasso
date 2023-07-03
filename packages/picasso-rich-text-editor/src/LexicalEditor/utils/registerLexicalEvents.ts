import type { LexicalEditor } from 'lexical'
import { HeadingNode } from '@lexical/rich-text'
import { COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND } from 'lexical'

import { replaceHeadingNodes } from './replaceHeadingNodes'

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

  const headingListener = editor.registerNodeTransform(
    HeadingNode,
    replaceHeadingNodes
  )

  // Cleanup is necessary to avoid listeners piling up with useEffect
  return () => {
    editorListenerCleanup()
    editorCommandsCleanup()
    headingListener()
  }
}
