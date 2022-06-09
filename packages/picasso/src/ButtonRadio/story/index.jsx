import ButtonRadio from '../ButtonRadio'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Radio Button', 'Radio Style Button.')
    .addExample('ButtonRadio/story/Default.example.tsx', {
      title: 'Default',
      takeScreenshot: false,
    })
    .addExample('ButtonRadio/story/States.example.tsx', {
      title: 'States',
      takeScreenshot: false,
    })
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonRadio,
  'Button.Radio'
)

export default {
  chapter,
  componentDocs,
}
