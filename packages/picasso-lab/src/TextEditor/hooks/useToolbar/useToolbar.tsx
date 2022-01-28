import Quill from 'quill'

import { ToolbarStateType, ActionCreatorsType } from '../../types'
import useToolbarHandlers from '../useToolbarHandlers'
import useToolbarUpdateOnEditorChange from '../useToolbarUpdateOnEditorChange'

type Props = {
  quill: Quill
  toolbarState: ToolbarStateType
  actions: ActionCreatorsType
}

const useToolbar = ({ quill, actions, toolbarState }: Props) => {
  useToolbarUpdateOnEditorChange({ quill, actions })

  const toolbarHandlers = useToolbarHandlers({
    quill,
    toolbarState,
    actions
  })

  return { toolbarHandlers }
}

export default useToolbar
