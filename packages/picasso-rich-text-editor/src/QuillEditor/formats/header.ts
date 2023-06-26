import type { Classes } from '@toptal/picasso-shared'
import Quill from 'quill'
import { getTypographyClassName } from '@toptal/picasso'

const QuillHeader = Quill.import('formats/header')

const makeHeaderFormat = (typographyClasses: Classes) =>
  class LinkBlot extends QuillHeader {
    static create(value: string) {
      const node = super.create(value)

      node.classList.add(
        ...getTypographyClassName(typographyClasses, {
          variant: 'heading',
          size: 'medium',
        }).split(' ')
      )

      return node
    }
  }

export default makeHeaderFormat
