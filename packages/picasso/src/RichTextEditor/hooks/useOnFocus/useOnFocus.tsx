import { useCallback } from 'react'

import { actions as toolbarActions } from '../../store/toolbar'
import { ActionsType } from '../../store'

type Props = {
  editorRef: React.RefObject<HTMLDivElement>
  toolbarRef: React.RefObject<HTMLDivElement>
  onFocus: () => void
  onBlur: () => void
  dispatch: React.Dispatch<ActionsType>
}

const useOnFocus = ({
  editorRef,
  toolbarRef,
  onFocus,
  onBlur,
  dispatch
}: Props) => {
  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      if (!editorRef.current || !toolbarRef.current) {
        return
      }

      toolbarActions.setDisabled(dispatch)(false)

      const focusElement = e.target as Node
      const isFocusElementInToolbar = toolbarRef.current.contains(focusElement)

      if (isFocusElementInToolbar) {
        return
      }

      onFocus()
    },
    [dispatch, onFocus, editorRef, toolbarRef]
  )

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      if (!toolbarRef.current || !editorRef.current) {
        return
      }

      const focusElement = e.relatedTarget as Node

      const isFocusElementInToolbar = toolbarRef.current.contains(focusElement)
      const isFocusElementInEditor = editorRef.current.contains(focusElement)

      if (isFocusElementInToolbar || isFocusElementInEditor) {
        return
      }

      toolbarActions.setDisabled(dispatch)(true)
      onBlur()
    },
    [dispatch, onBlur, toolbarRef, editorRef]
  )

  return {
    handleFocus,
    handleBlur
  }
}

export default useOnFocus
