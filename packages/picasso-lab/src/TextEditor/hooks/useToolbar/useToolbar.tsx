import { useState } from 'react'

import { ToolbarStateType, EditorRefType } from '../../types'
import { EMPTY_STATE } from '../../constants'
import useEditorChange, { getUpdateToolbarState } from '../useEditorChange'
import useToolbarHandlers from '../useToolbarHandlers'

type Props = {
  ref: EditorRefType
}
const useToolbar = ({ ref }: Props) => {
  const [toolbarState, setToolbarState] = useState<ToolbarStateType>(
    EMPTY_STATE
  )

  // on quill change events update toolbar active states
  useEditorChange({
    ref,
    handler: getUpdateToolbarState({ ref, setToolbarState })
  })

  const toolbarHandlers = useToolbarHandlers({
    ref,
    toolbarState
  })

  return { toolbarState, toolbarHandlers }
}

export default useToolbar
