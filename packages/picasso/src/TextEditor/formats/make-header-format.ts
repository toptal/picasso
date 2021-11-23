import Quill from 'quill'
import { makeStyles, Theme } from '@material-ui/core'

import { getTypographyClassName } from '../../Typography/Typography'
import typographyStyles from '../../Typography/styles'

const QuillHeader = Quill.import('formats/header')

export const useHeaderStyles = makeStyles<Theme>(typographyStyles, {
  name: 'TextEditorHeader'
})

const makeHeaderFormat = (typographyClasses: Record<string, string>) =>
  class extends QuillHeader {
    static tagName = ['H1', 'H2', 'H3', 'H4']

    static create(value: string) {
      const formattedValue = parseInt(value, 10) > 4 ? '4' : value

      const node = super.create(formattedValue)

      node.setAttribute(
        'class',
        getTypographyClassName(typographyClasses, {
          variant: 'heading',
          size: 'small' // TODO: detect heading size based on the tag. We have to create an opposite of toMuiVariant (ex. toPicassoVariant)
        })
      )

      return node
    }
  }

export default makeHeaderFormat
