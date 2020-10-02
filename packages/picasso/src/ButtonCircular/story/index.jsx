import { ButtonCircular } from '../ButtonCircular'
// @ts-ignore
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Circular Button', 'Circular Style Button.')
    .addExample('ButtonCircular/story/Default.example.jsx', 'Default')
    .addExample('ButtonCircular/story/Variants.example.jsx', 'Variants')
    .addExample('ButtonCircular/story/States.example.jsx', 'States')
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonCircular,
  'Button.Circular'
)

export default {
  chapter,
  componentDocs
}
