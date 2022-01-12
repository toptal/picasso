import { TextChangeHandler } from 'quill'

import { EditorRefType, TextEditorProps } from '../..'
import { removeClasses, removeCursorSpan } from '../../utils'

type Props = {
  ref: EditorRefType
  onChange: TextEditorProps['onChange']
}

type HandlerType = ({ ref, onChange }: Props) => TextChangeHandler

const getTextChangeHandler: HandlerType = ({ ref, onChange }) => () => {
  const quill = ref.current

  if (!quill) {
    return
  }

  const [cleanValue] = [quill.root.innerHTML]
    .map(removeCursorSpan)
    .map(removeClasses)

  onChange(cleanValue)
}

export default getTextChangeHandler
