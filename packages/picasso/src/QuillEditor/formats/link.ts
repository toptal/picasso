import { Classes } from '@toptal/picasso-shared'
import Quill from 'quill'

import getTypographyClassName from '../../Typography/utils/get-typography-class-name'

const QuillLink = Quill.import('formats/link')

const makeLinkFormat = (typographyClasses: Classes) =>
  class LinkBlot extends QuillLink {
    static create(value: string) {
      const node = super.create(value)

      node.classList.add(
        getTypographyClassName(typographyClasses, {
          variant: 'body',
          size: 'inherit',
          underline: 'solid',
          color: 'light-blue',
          weight: 'regular',
        })
          .split(' ')
          .join(',')
      )

      return node
    }
  }

export default makeLinkFormat
