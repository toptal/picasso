import { useReducer, useCallback } from 'react'

import { EMPTY_STATE } from '../constants'
import { Props as TextEditorProps } from '../TextEditor'
import { ToolbarStateType } from '../types'
import useAutofocus from './useAutofocus'
import useDisableEditor from './useDisableEditor'
import useEditorLooseFocusFix from './useEditorLooseFocusFix'
import useOnChange from './useOnChange'
import useOnValueChange from './useOnValueChange'
import useQuillInstance from './useQuillInstance'
import useToolbarActiveStates from './useToolbarActiveStates'
import useToolbarHandlers from './useToolbarHandlers'

type ActionType = {
  type: 'set'
  payload: ToolbarStateType
}

type Props = {
  id: TextEditorProps['id']
  placeholder: TextEditorProps['placeholder']
  onChange: TextEditorProps['onChange']
  value: TextEditorProps['value']
  autofocus: TextEditorProps['autofocus']
  disabled: TextEditorProps['disabled']
}

const reducer = (
  state: ToolbarStateType,
  { type, payload }: ActionType
): ToolbarStateType => {
  switch (type) {
    case 'set':
      return payload

    default:
      throw new Error('ToolbarReducer: uknown action type')
  }
}

const useTextEditor = ({
  autofocus,
  disabled,
  id,
  onChange,
  placeholder,
  value
}: Props) => {
  const [toolbarState, dispatch] = useReducer(reducer, EMPTY_STATE)

  // create new instance of Quill and save it to ref
  const quillInstanceRef = useQuillInstance({ id, placeholder })

  // subscribe onChange callback to editors text change
  useOnChange({ ref: quillInstanceRef, onChange })

  // TextEditor works as controlled input, when someone changes props.value
  // we need to also change value in editor itself
  useOnValueChange({ ref: quillInstanceRef, value })

  const setToolbarState = useCallback(
    (payload: ToolbarStateType) => dispatch({ type: 'set', payload }),
    []
  )

  // on quill change events update toolbar active states
  useToolbarActiveStates({
    ref: quillInstanceRef,
    setToolbarState
  })

  const toolbarHandlers = useToolbarHandlers({
    ref: quillInstanceRef,
    toolbarState
  })

  useDisableEditor({ ref: quillInstanceRef, disabled })
  useAutofocus({ ref: quillInstanceRef, autofocus })

  // common issue of custom toolbar
  // https://github.com/quilljs/quill/issues/1290
  // when clicking anywhere quill looses focus, we need
  // to prevent it when clicking inside toolbar
  useEditorLooseFocusFix({ ref: quillInstanceRef })

  return { toolbarState, toolbarHandlers }
}

export default useTextEditor
