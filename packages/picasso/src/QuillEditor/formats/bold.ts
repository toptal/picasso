import { Classes } from '@toptal/picasso-shared'
import Quill from 'quill'

import getTypographyClassName from '../../Typography/utils/get-typography-class-name'

const QuillBold = Quill.import('formats/bold')

class TypographyBoldBlot extends QuillBold {
  static typographyClasses: Classes
  static create() {
    const node = super.create()

    node.setAttribute(
      'class',
      getTypographyClassName(this.typographyClasses, {
        variant: 'body',
        size: 'inherit',
        weight: 'semibold',
      })
    )

    return node
  }
}

const makeBoldFormat = (typographyClasses: Classes) => {
  TypographyBoldBlot.typographyClasses = typographyClasses

  return TypographyBoldBlot
}

export default makeBoldFormat
