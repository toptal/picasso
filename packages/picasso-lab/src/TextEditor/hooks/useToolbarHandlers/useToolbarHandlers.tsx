import { useCallback, useMemo } from 'react'

import {
  ToolbarStateType,
  EditorRefType,
  ToolbarHandlers,
  ActionCreatorsType
} from '../../types'

type Props = {
  ref: EditorRefType
  toolbarState: ToolbarStateType
  actions: ActionCreatorsType
}

const useToolbarHandlers = ({ ref, toolbarState, actions }: Props) => {
  const { bold, italic, list } = toolbarState
  const { setBold, setItalic } = actions

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
      quill.format('bold', !bold)
      setBold(!bold)
    }
  }, [bold, ref, setBold])

  const handleItalic: ToolbarHandlers['handleItalic'] = useCallback(() => {
    const quill = ref.current

    if (quill) {
      quill.format('italic', !italic)
      setItalic(!italic)
    }
  }, [italic, ref, setItalic])

  const handleOrdered: ToolbarHandlers['handleOrdered'] = useCallback(() => {
    const quill = ref.current

    if (quill) {
      quill.format('list', list === 'ordered' ? false : 'ordered')
    }
  }, [list, ref])

  const handleUnordered: ToolbarHandlers['handleUnordered'] = useCallback(() => {
    const quill = ref.current

    if (quill) {
      quill.format('list', list === 'bullet' ? false : 'bullet')
    }
  }, [list, ref])

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
