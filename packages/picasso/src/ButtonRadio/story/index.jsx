import ButtonRadio from '../ButtonRadio'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(
  page =>
    page
      .createChapter('Radio Button', 'Radio Style Button.')
      .addExample('ButtonRadio/story/Default.example.tsx', {
        title: 'Default',
        takeScreenshot: false,
      }) // picasso-skip-visuals
      .addExample('ButtonRadio/story/States.example.tsx', {
        title: 'States',
        takeScreenshot: false,
      }) // picasso-skip-visuals
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonRadio,
  'Button.Radio'
)

export default {
  chapter,
  componentDocs,
}
