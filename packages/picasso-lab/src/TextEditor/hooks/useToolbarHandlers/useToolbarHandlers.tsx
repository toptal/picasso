import { useCallback, useMemo } from 'react'

import {
  ToolbarStateType,
  EditorRefType,
  ToolbarHandlers,
  SetToolbarStateKeyType
} from '../../types'

type Props = {
  ref: EditorRefType
  toolbarState: ToolbarStateType
  setToolbarStateKey: SetToolbarStateKeyType
}

const useToolbarHandlers = ({
  ref,
  toolbarState,
  setToolbarStateKey
}: Props) => {
  const handleHeader: ToolbarHandlers['handleHeader'] = useCallback(
    event => {
      const quill = ref.current

      if (!quill) {
        return
      }

      const selectValue = event.target.value

      // when we want to unformat we should pass false
      quill.format('header', selectValue ? parseFloat(selectValue) : false)
      // we need to return focus into editor, it remembers itself last position of cursor
      setTimeout(() => {
        quill.focus()
      }, 0)
    },
    [ref]
  )

  const handleBold: ToolbarHandlers['handleBold'] = useCallback(() => {
    const quill = ref.current

    if (quill) {
      if (!quill.hasFocus()) {
        quill.focus()
      }
      quill.format('bold', !toolbarState.bold)
      setToolbarStateKey('bold', !toolbarState.bold)
    }
  }, [toolbarState.bold, ref, setToolbarStateKey])

  const handleItalic: ToolbarHandlers['handleItalic'] = useCallback(() => {
    const quill = ref.current

    if (quill) {
      if (!quill.hasFocus()) {
        quill.focus()
      }
      quill.format('italic', !toolbarState.italic)
      setToolbarStateKey('italic', !toolbarState.italic)
    }
  }, [toolbarState.italic, ref, setToolbarStateKey])

  const handleOrdered: ToolbarHandlers['handleOrdered'] = useCallback(() => {
    const quill = ref.current

    if (quill) {
      if (!quill.hasFocus()) {
        quill.focus()
      }
      quill.format('list', toolbarState.list === 'ordered' ? false : 'ordered')
    }
  }, [toolbarState.list, ref])

  const handleUnordered: ToolbarHandlers['handleUnordered'] = useCallback(() => {
    const quill = ref.current

    if (quill) {
      if (!quill.hasFocus()) {
        quill.focus()
      }
      quill.format('list', toolbarState.list === 'bullet' ? false : 'bullet')
    }
  }, [toolbarState.list, ref])

  const toolbarHandlers = useMemo(
    () => ({
      handleHeader,
      handleBold,
      handleItalic,
      handleOrdered,
      handleUnordered
    }),
    [handleHeader, handleBold, handleItalic, handleOrdered, handleUnordered]
  )

  return toolbarHandlers
}

export default useToolbarHandlers
