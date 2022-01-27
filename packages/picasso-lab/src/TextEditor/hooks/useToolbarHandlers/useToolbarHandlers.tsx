import Quill from 'quill'
import { useCallback, useMemo } from 'react'

import {
  ToolbarStateType,
  ToolbarHandlers,
  ActionCreatorsType
} from '../../types'

type Props = {
  quill: Quill | undefined
  toolbarState: ToolbarStateType
  actions: ActionCreatorsType
}

const useToolbarHandlers = ({ quill, toolbarState, actions }: Props) => {
  const { bold, italic, list } = toolbarState
  const { setBold, setItalic } = actions

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
    if (quill) {
      quill.format('bold', !bold)
      setBold(!bold)
    }
  }, [bold, quill, setBold])

  const handleItalic: ToolbarHandlers['handleItalic'] = useCallback(() => {
    if (quill) {
      quill.format('italic', !italic)
      setItalic(!italic)
    }
  }, [italic, quill, setItalic])

  const handleOrdered: ToolbarHandlers['handleOrdered'] = useCallback(() => {
    if (quill) {
      quill.format('list', list === 'ordered' ? false : 'ordered')
    }
  }, [list, quill])

  const handleUnordered: ToolbarHandlers['handleUnordered'] = useCallback(() => {
    if (quill) {
      quill.format('list', list === 'bullet' ? false : 'bullet')
    }
  }, [list, quill])

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
