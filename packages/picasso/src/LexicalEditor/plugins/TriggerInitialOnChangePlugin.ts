import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import type { EditorState, LexicalEditor } from 'lexical'

const TriggerInitialOnChangePlugin = ({
  onChange,
}: {
  onChange: (
    editorState: EditorState,
    editor: LexicalEditor,
    tags: Set<string>
  ) => void
}) => {
  const [editor] = useLexicalComposerContext()

  editor.registerUpdateListener(({ editorState, prevEditorState, tags }) => {
    if (prevEditorState.isEmpty()) {
      onChange(editorState, editor, tags)
    }
  })

  return null
}

export default TriggerInitialOnChangePlugin
