import Quill, { SelectionChangeHandler } from 'quill'
import { useCallback, Dispatch } from 'react'

import { StateType, ActionsType } from '../../types'
import { actions as editorActions } from '../../store/editor'
import useOnSelectionChange from '../useOnSelectionChange'

type Props = {
  quill: Quill
  state: StateType
  dispatch: Dispatch<ActionsType>
}

const useHasFocus = ({ quill, state, dispatch }: Props) => {
  const handleFocusChange: SelectionChangeHandler = useCallback(
    (_, __, source) => {
      const isSilentEvent = source === 'silent'

      if (isSilentEvent) {
        return
      }

      const hasCurrentFocus = quill.hasFocus()

      if (state.editor.isFocused !== hasCurrentFocus) {
        editorActions.setIsFocused(dispatch)(hasCurrentFocus)
      }
    },
    [quill, state, dispatch]
  )

  useOnSelectionChange({ quill, handler: handleFocusChange })
}

export default useHasFocus
