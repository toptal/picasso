import { getTypographyClassName } from '@toptal/picasso/Typography/utils'
import { Classes } from '@toptal/picasso-shared'
import Quill from 'quill'

const QuillBold = Quill.import('formats/bold')

class TypographyBoldBlot extends QuillBold {
  static typographyClasses: Classes
  static create() {
    const node = super.create()

    node.setAttribute(
      'class',
      getTypographyClassName(this.typographyClasses, {
        weight: 'semibold'
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
