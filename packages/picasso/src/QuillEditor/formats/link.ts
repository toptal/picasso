import { Classes } from '@toptal/picasso-shared'
import Quill from 'quill'

import getTypographyClassName from '../../Typography/utils/get-typography-class-name'

const QuillLink = Quill.import('formats/link')

const makeLinkFormat = (typographyClasses: Classes) =>
  (class LinkBlot extends QuillLink {
    static create(value: string) {
      const node = super.create(value)

      node.classList.add(
        ...getTypographyClassName(typographyClasses, {
          variant: 'body',
          size: 'inherit',
          underline: 'solid',
          // we don't expose blue color in typography since it should be used only for links.
          // in this case we are simulating look of the link
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          color: 'blue',
          weight: 'regular',
        }).split(' ')
      )

      return node
    }
  })

export default makeLinkFormat
