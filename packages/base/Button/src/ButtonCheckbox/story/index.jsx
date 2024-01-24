import ButtonCheckbox from '../ButtonCheckbox'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Checkbox Button', 'Checkbox Style Button.')
    .addExample(
      'ButtonCheckbox/story/Default.example.tsx',
      'Default',
      'base/Button'
    )
    .addExample(
      'ButtonCheckbox/story/States.example.tsx',
      'States',
      'base/Button'
    )
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonCheckbox,
  'Button.Checkbox'
)

export default {
  chapter,
  componentDocs,
}
