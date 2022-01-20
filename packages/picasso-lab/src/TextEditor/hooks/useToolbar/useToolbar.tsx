import { useMemo } from 'react'

import { ToolbarStateType, EditorRefType, ActionsType } from '../../types'
import useEditorChange, { getUpdateToolbarState } from '../useEditorChange'
import useToolbarHandlers from '../useToolbarHandlers'

type Props = {
  ref: EditorRefType
  toolbarState: ToolbarStateType
  actions: ActionsType
}

const useToolbar = ({ ref, actions, toolbarState }: Props) => {
  // on quill change events update toolbar active states
  useEditorChange({
    ref,
    handler: useMemo(
      () =>
        getUpdateToolbarState({
          ref,
          setToolbarState: actions.setToolbarState
        }),
      [ref, actions.setToolbarState]
    )
  })

  const toolbarHandlers = useToolbarHandlers({
    ref,
    toolbarState,
    setToolbarStateKey: actions.setToolbarStateKey
  })

  return { toolbarState, toolbarHandlers }
}

export default useToolbar
