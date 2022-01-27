import Quill, { TextChangeHandler } from 'quill'

import { TextEditorProps } from '../..'
import { removeClasses, removeCursorSpan } from '../../utils'

type Props = {
  quill: Quill | undefined
  onChange: TextEditorProps['onChange']
}

type HandlerType = ({ quill, onChange }: Props) => TextChangeHandler

const getTextChangeHandler: HandlerType = ({ quill, onChange }) => () => {
  if (!quill) {
    return
  }

  const [cleanValue] = [quill.root.innerHTML]
    .map(removeCursorSpan)
    .map(removeClasses)

  onChange(cleanValue)
}

export default getTextChangeHandler
