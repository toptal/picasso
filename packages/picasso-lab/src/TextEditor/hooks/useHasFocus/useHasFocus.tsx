import { useCallback, Dispatch } from 'react'

import { StateType, ActionsType } from '../../types'
import { actions as editorActions } from '../../store/editor'
import { actions as toolbarActions } from '../../store/toolbar'

type Props = {
  state: StateType
  dispatch: Dispatch<ActionsType>
}

const actions = {
  toolbar: {
    setBold: () => {}
  },
  editor: {}
}

const useHasFocus = ({ state, actions }: Props) => {
  const handleFocusChange = useCallback(
    (isFocused: boolean) => {
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
