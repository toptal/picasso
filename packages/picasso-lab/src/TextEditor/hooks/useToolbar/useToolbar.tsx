import { useMemo } from 'react'

import {
  ToolbarStateType,
  EditorRefType,
  ActionCreatorsType
} from '../../types'
import useEditorChange, { getUpdateToolbarState } from '../useEditorChange'
import useToolbarHandlers from '../useToolbarHandlers'

type Props = {
  ref: EditorRefType
  toolbarState: ToolbarStateType
  actions: ActionCreatorsType
}

const useToolbar = ({ ref, actions, toolbarState }: Props) => {
  // on quill change events update toolbar active states
  useEditorChange({
    ref,
    handler: useMemo(
      () =>
        getUpdateToolbarState({
          ref,
          actions
        }),
      [ref, actions]
    )
  })

  const toolbarHandlers = useToolbarHandlers({
    ref,
    toolbarState,
    actions
  })

  return { toolbarState, toolbarHandlers }
}

export default useToolbar
