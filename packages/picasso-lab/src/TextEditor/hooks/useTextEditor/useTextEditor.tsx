import { useMemo } from 'react'

import { Props as TextEditorProps } from '../../TextEditor'
import useAutofocus from '../useAutofocus'
import useQuillInstance from '../useQuillInstance'
import useDisabledEditor from '../useDisabledEditor'
import useEditorLoseFocusFix, {
  preventDefaultHandler
} from '../useEditorLoseFocusFix'
import useTextChange from '../useTextChange'
import useMinMaxLength from '../useMinMaxLength'
import getTextChangeHandler from '../getTextChangeHandler'
import useToolbar from '../useToolbar'

type Props = {
  autofocus: TextEditorProps['autofocus']
  disabled: TextEditorProps['disabled']
  id: TextEditorProps['id']
  onChange: TextEditorProps['onChange']
  placeholder: TextEditorProps['placeholder']
  minlength?: TextEditorProps['minlength']
  maxlength?: TextEditorProps['maxlength']
  typographyContainerRef?: React.RefObject<HTMLDivElement>
  getTextForMinLength?: TextEditorProps['getTextForMinLength']
  getTextForMaxLength?: TextEditorProps['getTextForMaxLength']
}

const useTextEditor = ({
  autofocus,
  disabled,
  id,
  onChange,
  placeholder,
  minlength,
  maxlength,
  getTextForMinLength,
  getTextForMaxLength,
  typographyContainerRef
}: Props) => {
  // create new instance of Quil  l and save it to ref
  const quillInstanceRef = useQuillInstance({ id, placeholder })

  useDisabledEditor({ ref: quillInstanceRef, disabled })
  useAutofocus({ ref: quillInstanceRef, autofocus })

  // common issue of custom toolbar
  // https://github.com/quilljs/quill/issues/1290
  // when clicking anywhere quill loses focus, we need
  // to prevent it when clicking inside toolbar

  useEditorLoseFocusFix({
    ref: quillInstanceRef,
    handler: preventDefaultHandler
  })

  // subscribe onChange callback to editors text change
  useTextChange({
    ref: quillInstanceRef,
    handler: useMemo(
      () => getTextChangeHandler({ ref: quillInstanceRef, onChange }),
      [quillInstanceRef, onChange]
    )
  })

  const counterState = useMinMaxLength({
    ref: quillInstanceRef,
    minlength,
    maxlength,
    getTextForMinLength,
    getTextForMaxLength,
    typographyContainerRef
  })

  // connect quill with custom toolbar
  const { toolbarState, toolbarHandlers } = useToolbar({
    ref: quillInstanceRef
  })

  return { toolbarState, toolbarHandlers, counterState }
}

export default useTextEditor
