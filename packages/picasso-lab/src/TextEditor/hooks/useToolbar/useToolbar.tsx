import Quill from 'quill'
import { useMemo } from 'react'

import { ToolbarStateType, ActionCreatorsType } from '../../types'
import useEditorChange, { getUpdateToolbarState } from '../useEditorChange'
import useToolbarHandlers from '../useToolbarHandlers'

type Props = {
  quill: Quill | undefined
  toolbarState: ToolbarStateType
  actions: ActionCreatorsType
}

const useToolbar = ({ quill, actions, toolbarState }: Props) => {
  // on quill change events update toolbar active states
  useEditorChange({
    quill,
    handler: useMemo(
      () =>
        getUpdateToolbarState({
          quill,
          actions
        }),
      [quill, actions]
    )
  })

  const toolbarHandlers = useToolbarHandlers({
    quill,
    toolbarState,
    actions
  })

  return { toolbarState, toolbarHandlers }
}

export default useToolbar
