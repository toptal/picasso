import { Props as TextEditorProps } from '../TextEditor'
import useAutofocus from './useAutofocus'
import useQuillInstance from './useQuillInstance'
import useDisabledEditor from './useDisabledEditor'

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
}

export default useTextEditor
