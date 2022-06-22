import { Classes } from '@toptal/picasso-shared'
import Quill from 'quill'

import getTypographyClassName from '../../Typography/utils/get-typography-class-name'

const QuillLink = Quill.import('formats/link')

class LinkBlot extends QuillLink {
  static typographyClasses: Classes
  static create(value: string) {
    const node = super.create(value)

    node.setAttribute(
      'class',
      getTypographyClassName(this.typographyClasses, {
        variant: 'body',
        size: 'inherit',
        underline: 'solid',
        color: 'light-blue',
        weight: 'regular',
      })
    )

    return node
  }
}

const makeLinkFormat = (typographyClasses: Classes) => {
  LinkBlot.typographyClasses = typographyClasses

  return LinkBlot
}

export default makeLinkFormat
