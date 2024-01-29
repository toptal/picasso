import ButtonRadio from '../ButtonRadio'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Radio Button', 'Radio Style Button.')
    .addExample(
      'ButtonRadio/story/Default.example.tsx',
      'Default',
      'base/Button'
    )
    .addExample('ButtonRadio/story/States.example.tsx', 'States', 'base/Button')
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonRadio,
  'Button.Radio'
)

export default {
  chapter,
  componentDocs,
}
