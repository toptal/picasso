import ButtonCheckbox from '../ButtonCheckbox'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Checkbox Button', 'Checkbox Style Button.')
    .addExample('ButtonCheckbox/story/Default.example.tsx', 'Default')
    .addExample('ButtonCheckbox/story/States.example.tsx', 'States')
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonCheckbox,
  'Button.Checkbox'
)

export default {
  chapter,
  componentDocs,
}
