import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-shared'
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

  useIsomorphicLayoutEffect(() => {
    if (onChange) {
      return editor.registerUpdateListener(
        ({ editorState, prevEditorState, tags }) => {
          if (prevEditorState.isEmpty()) {
            onChange(editorState, editor, tags)
          }
        }
      )
    }
  }, [editor, onChange])

  return null
}

export default TriggerInitialOnChangePlugin
