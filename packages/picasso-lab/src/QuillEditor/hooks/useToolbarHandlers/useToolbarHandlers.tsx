import Quill from 'quill'
import { useCallback, useMemo } from 'react'

import { TextFormatHandler, ToolbarHandlers } from '../../types'

type Props = {
  quill?: Quill
  handleTextFormat: TextFormatHandler
}

const useToolbarHandlers = ({
  quill,
  handleTextFormat
}: Props): { toolbarHandlers: ToolbarHandlers } => {
  const handleHeader: ToolbarHandlers['handleHeader'] = useCallback(
    event => {
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
    [quill]
  )

  const handleBold: ToolbarHandlers['handleBold'] = useCallback(() => {
    if (!quill) {
      return
    }

    const currentBold = quill.getFormat().bold
    const toggledBold = !currentBold

    quill.format('bold', toggledBold)
    handleTextFormat('bold', toggledBold)
  }, [quill, handleTextFormat])

  const handleItalic: ToolbarHandlers['handleItalic'] = useCallback(() => {
    if (!quill) {
      return
    }

    const currentItalic = quill.getFormat().italic
    const toggledItalic = !currentItalic

    quill.format('italic', toggledItalic)
    handleTextFormat('italic', toggledItalic)
  }, [quill, handleTextFormat])

  const handleOrdered: ToolbarHandlers['handleOrdered'] = useCallback(() => {
    if (!quill) {
      return
    }

    const currentList = quill.getFormat().list
    const value = currentList === 'ordered' ? false : 'ordered'

    quill.format('list', value)
    handleTextFormat('list', value)
  }, [quill, handleTextFormat])

  const handleUnordered: ToolbarHandlers['handleUnordered'] = useCallback(() => {
    if (!quill) {
      return
    }

    const currentList = quill.getFormat().list
    const value = currentList === 'bullet' ? false : 'bullet'

    quill.format('list', value)
    handleTextFormat('list', value)
  }, [quill, handleTextFormat])

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

  return { toolbarHandlers }
}

export default useToolbarHandlers
