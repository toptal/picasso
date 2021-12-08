import { MutableRefObject } from 'react'
import Quill from 'quill'

import { Props } from './TextEditor'

export type EditorOptionsType = {
  id: Props['id']
  placeholder?: Props['placeholder']
}

export type EditorRefType = MutableRefObject<Quill | undefined>
