import { Props as TextEditorProps } from '../TextEditor'
import useAutofocus from './useAutofocus'
import useQuillInstance from './useQuillInstance'
import useDisabledEditor from './useDisabledEditor'
import useEditorLoseFocusFix from './useEditorLoseFocusFix'
import useEditorLoseFocusFixHandler from './useEditorLoseFocusFixHandler'
import useTextChange from './useTextChange'
import useTextChangeHandler from './useTextChangeHandler'

type Props = {
  autofocus: TextEditorProps['autofocus']
  disabled: TextEditorProps['disabled']
  id: TextEditorProps['id']
  onChange: TextEditorProps['onChange']
  placeholder: TextEditorProps['placeholder']
  value: TextEditorProps['value']
}

const useTextEditor = ({
  autofocus,
  disabled,
  id,
  onChange,
  placeholder
}: Props) => {
  // create new instance of Quill and save it to ref
  const quillInstanceRef = useQuillInstance({ id, placeholder })

  useDisabledEditor({ ref: quillInstanceRef, disabled })
  useAutofocus({ ref: quillInstanceRef, autofocus })

  // common issue of custom toolbar
  // https://github.com/quilljs/quill/issues/1290
  // when clicking anywhere quill loses focus, we need
  // to prevent it when clicking inside toolbar
  const { preventDefaultHandler } = useEditorLoseFocusFixHandler()

  useEditorLoseFocusFix({
    ref: quillInstanceRef,
    handler: preventDefaultHandler
  })

  const { textChangeHandler } = useTextChangeHandler({
    ref: quillInstanceRef,
    onChange
  })

  // subscribe onChange callback to editors text change
  useTextChange({ ref: quillInstanceRef, handler: textChangeHandler })
}

export default useTextEditor
