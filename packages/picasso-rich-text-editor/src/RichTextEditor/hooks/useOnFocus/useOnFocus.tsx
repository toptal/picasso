import { useCallback, useState } from 'react'

import { actions as toolbarActions } from '../../store/toolbar'
import type { ActionsType } from '../../store'

type Props = {
  autoFocus: boolean
  editorRef: React.RefObject<HTMLDivElement>
  toolbarRef: React.RefObject<HTMLDivElement>
  wrapperRef: React.RefObject<HTMLDivElement>
  onFocus: () => void
  onBlur: () => void
  dispatch: React.Dispatch<ActionsType>
}

const useOnFocus = ({
  autoFocus,
  editorRef,
  toolbarRef,
  wrapperRef,
  onFocus,
  onBlur,
  dispatch,
}: Props) => {
  const [isEditorFocused, setIsEditorFocused] = useState(autoFocus)

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      if (!editorRef.current || !toolbarRef.current || !wrapperRef) {
        return
      }

      toolbarActions.setDisabled(dispatch)(false)

      const focusElement = e.target as Node
      const isFocusElementInToolbar = toolbarRef.current.contains(focusElement)

      if (isFocusElementInToolbar) {
        return
      }

      setIsEditorFocused(true)

      onFocus()
    },
    [dispatch, onFocus, editorRef, toolbarRef, wrapperRef]
  )

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      if (!toolbarRef.current || !editorRef.current) {
        return
      }

      const focusElement = e.relatedTarget as Node

      const isFocusElementInToolbar = toolbarRef.current.contains(focusElement)
      const isFocusElementInEditor = editorRef.current.contains(focusElement)
      const isFocusElementWrapper = wrapperRef.current === focusElement

      if (
        isFocusElementInToolbar ||
        isFocusElementInEditor ||
        isFocusElementWrapper
      ) {
        return
      }

      toolbarActions.setDisabled(dispatch)(true)

      toolbarActions.resetFormat(dispatch)()

      setIsEditorFocused(false)

      onBlur()
    },
    [dispatch, onBlur, toolbarRef, editorRef, wrapperRef]
  )

  return {
    isEditorFocused,
    handleFocus,
    handleBlur,
  }
}

export default useOnFocus
