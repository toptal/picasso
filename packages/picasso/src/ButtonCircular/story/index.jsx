import { ButtonCircular } from '../ButtonCircular'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Circular Button', 'Circular Style Button.')
    .addExample('ButtonCircular/story/Default.example.tsx', 'Default')
    .addExample('ButtonCircular/story/Variants.example.tsx', 'Variants')
    .addExample('ButtonCircular/story/States.example.tsx', 'States')
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonCircular,
  'Button.Circular'
)

export default {
  chapter,
  componentDocs
}
