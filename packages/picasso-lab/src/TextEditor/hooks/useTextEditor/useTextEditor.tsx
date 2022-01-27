import { useMemo } from 'react'

import { Props as TextEditorProps } from '../../TextEditor'
import useAutofocus from '../useAutofocus'
import useQuillInstance from '../useQuillInstance'
import useDisabledEditor from '../useDisabledEditor'
import useEditorLoseFocusFix, {
  preventDefaultHandler
} from '../useEditorLoseFocusFix'
import useTextChange from '../useTextChange'
import getTextChangeHandler from '../getTextChangeHandler'
import useToolbar from '../useToolbar'
import useToolbarState from '../useToolbarState'
import useHasFocus from '../useHasFocus/useHasFocus'

type Props = {
  autofocus: TextEditorProps['autofocus']
  disabled: TextEditorProps['disabled']
  id: TextEditorProps['id']
  onChange: TextEditorProps['onChange']
  placeholder: TextEditorProps['placeholder']
}

const useTextEditor = ({
  autofocus,
  disabled,
  id,
  onChange,
  placeholder
}: Props) => {
  const { actions, toolbarState } = useToolbarState()
  const quill = useQuillInstance({ id, placeholder, actions })

  const { hasFocus } = useHasFocus({ quill })

  useDisabledEditor({ quill, disabled })
  useAutofocus({ quill, autofocus })

  // common issue of custom toolbar
  // https://github.com/quilljs/quill/issues/1290
  // when clicking anywhere quill loses focus, we need
  // to prevent it when clicking inside toolbar
  useEditorLoseFocusFix({
    quill,
    handler: preventDefaultHandler
  })

  // subscribe onChange callback to editors text change
  useTextChange({
    quill,
    handler: useMemo(() => getTextChangeHandler({ quill, onChange }), [
      quill,
      onChange
    ])
  })

  // connect quill with custom toolbar
  const { toolbarHandlers } = useToolbar({
    quill,
    toolbarState,
    actions
  })

  return { toolbarState, toolbarHandlers, isToolbarDisabled: !hasFocus }
}

export default useTextEditor
