import type { LexicalEditor } from 'lexical'
import { mergeRegister } from '@lexical/utils'
import { COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND } from 'lexical'

import type { ToolbarAction } from './toolbarState'
import { ToolbarActions } from './toolbarState'

export type LexicalRegisterParams = {
  editor: LexicalEditor
  activeEditor: LexicalEditor
  updateToolbar: () => void
  dispatch: (value: ToolbarAction) => void
}

// Subscribes to Lexical editor events and updates the toolbar state accordingly
export const registerLexicalEvents = ({
  editor,
  activeEditor,
  updateToolbar,
  dispatch,
}: LexicalRegisterParams) => {
  const editorListenerCleanup = mergeRegister(
    editor.registerEditableListener(editable => {
      dispatch({
        type: ToolbarActions.UPDATE_IS_EDITABLE,
        value: editable,
      })
    }),
    activeEditor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar()
      })
    })
  )
  const editorCommandsCleanup = editor.registerCommand(
    SELECTION_CHANGE_COMMAND,
    (_payload, newEditor) => {
      updateToolbar()
      dispatch({
        type: ToolbarActions.UPDATE_ACTIVE_EDITOR,
        value: newEditor,
      })

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
