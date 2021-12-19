import { getTypographyClassName } from '@toptal/picasso/Typography/utils'
import { Classes } from '@toptal/picasso-shared'
import Quill from 'quill'

const QuillHeader = Quill.import('formats/header')

class TypographyHeaderBlot extends QuillHeader {
  static typographyClasses: Classes

  static create() {
    // we only support h3, so every other heading will be transformed to it
    const node = super.create(3)

    node.setAttribute(
      'class',
      getTypographyClassName(this.typographyClasses, {
        variant: 'heading',
        size: 'medium'
      })
    )

    return node
  }
}

const makeHeaderFormat = (typographyClasses: Classes) => {
  TypographyHeaderBlot.typographyClasses = typographyClasses

  return TypographyHeaderBlot
}

export default makeHeaderFormat
