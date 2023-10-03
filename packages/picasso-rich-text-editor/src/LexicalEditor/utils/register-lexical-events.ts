import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import type { LexicalEditor } from 'lexical'
import { $isHeadingNode } from '@lexical/rich-text'

import { getSelectedNode } from './get-selected-node'

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

  const formatCommandCleanup = editor.registerCommand(
    FORMAT_TEXT_COMMAND,
    () => {
      const selection = $getSelection()

      if ($isRangeSelection(selection)) {
        const node = getSelectedNode(selection)
        const parent = node.getParent()

        if ($isHeadingNode(parent) || $isHeadingNode(node)) {
          return true
        }
      }

      return false
    },
    COMMAND_PRIORITY_CRITICAL
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
    formatCommandCleanup()
  }
}
