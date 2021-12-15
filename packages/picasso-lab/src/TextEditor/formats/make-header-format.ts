import { getTypographyClassName } from '@toptal/picasso/Typography/utils'
import Quill from 'quill'

const QuillHeader = Quill.import('formats/header')

const makeHeaderFormat = (typographyClasses: Record<string, string>) =>
  class extends QuillHeader {
    static tagName = ['H1', 'H2', 'H3', 'H4']

    static create() {
      // we only support h3, so every other heading will be transformed to it
      const node = super.create(3)

      node.setAttribute(
        'class',
        getTypographyClassName(typographyClasses, {
          variant: 'heading',
          size: 'medium'
        })
      )

      return node
    }
  }

export default makeHeaderFormat
