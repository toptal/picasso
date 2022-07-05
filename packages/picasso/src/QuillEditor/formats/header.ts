import { Classes } from '@toptal/picasso-shared'
import Quill from 'quill'

import getTypographyClassName from '../../Typography/utils/get-typography-class-name'

const QuillHeader = Quill.import('formats/header')

const makeHeaderFormat = (typographyClasses: Classes) =>
  (class LinkBlot extends QuillHeader {
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
  })

export default makeHeaderFormat
