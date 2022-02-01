import { useCallback, Dispatch } from 'react'

import { StateType, ActionsType } from '../../types'
import { actions as editorActions } from '../../store/editor'
import { actions as toolbarActions } from '../../store/toolbar'

type Props = {
  state: StateType
  dispatch: Dispatch<ActionsType>
}

const useHasFocus = ({ state, dispatch }: Props) => {
  const handleFocusChange = useCallback(
    (isFocused: boolean) => {
      console.log('isFocused:', isFocused)
      const hasCurrentFocus = isFocused

      if (state.editor.isFocused !== hasCurrentFocus) {
        toolbarActions.setDisabled(dispatch)(!hasCurrentFocus)
        editorActions.setIsFocused(dispatch)(hasCurrentFocus)
      }
    },
    [state, dispatch]
  )

  return { handleFocusChange }
}

export default useHasFocus
