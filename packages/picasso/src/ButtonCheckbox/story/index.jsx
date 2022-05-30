import ButtonCheckbox from '../ButtonCheckbox'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(
  page =>
    page
      .createChapter('Checkbox Button', 'Checkbox Style Button.')
      .addExample('ButtonCheckbox/story/Default.example.tsx', {
        title: 'Default',
        takeScreenshot: false
      }) // picasso-skip-visuals
      .addExample('ButtonCheckbox/story/States.example.tsx', {
        title: 'States',
        takeScreenshot: false
      }) // picasso-skip-visuals
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonCheckbox,
  'Button.Checkbox'
)

export default {
  chapter,
  componentDocs
}
