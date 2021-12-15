import { getTypographyClassName } from '@toptal/picasso/Typography/utils'
import Quill from 'quill'

const QuillBold = Quill.import('formats/bold')

const makeBoldFormat = (typographyClasses: Record<string, string>) =>
  class extends QuillBold {
    static create() {
      const node = super.create()

      node.setAttribute(
        'class',
        getTypographyClassName(typographyClasses, {
          weight: 'semibold'
        })
      )

      return node
    }
  }

export default makeBoldFormat
