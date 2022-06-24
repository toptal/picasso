import { Classes } from '@toptal/picasso-shared'
import Quill from 'quill'

import getTypographyClassName from '../../Typography/utils/get-typography-class-name'

const QuillLink = Quill.import('formats/link')

class LinkBlot extends QuillLink {
  static typographyClasses: Classes
  static create(value: string) {
    const node: Element = super.create(value)

    node.setAttribute(
      'class',
      getTypographyClassName(this.typographyClasses, {
        variant: 'body',
        size: 'inherit',
        // we don't expose blue color in typography since it should be used only for links.
        // in this case we are simulating look of the link
        // @ts-ignore
        color: 'blue',
        weight: 'inherit',
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
