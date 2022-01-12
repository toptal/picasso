import { Props as TextEditorProps } from '../TextEditor'
import useAutofocus from './useAutofocus'
import useQuillInstance from './useQuillInstance'
import useDisabledEditor from './useDisabledEditor'
import useEditorLoseFocusFix from './useEditorLoseFocusFix'
import useEditorLoseFocusFixHandler from './useEditorLoseFocusFixHandler'

type Props = {
  id: TextEditorProps['id']
  placeholder: TextEditorProps['placeholder']
  onChange: TextEditorProps['onChange']
  value: TextEditorProps['value']
  autofocus: TextEditorProps['autofocus']
  disabled: TextEditorProps['disabled']
}

const useTextEditor = ({ autofocus, disabled, id, placeholder }: Props) => {
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
}

export default useTextEditor
