import { ButtonAction } from '../ButtonAction'
// @ts-ignore
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Action Button', 'Action Style Button.')
    .addExample('ButtonAction/story/Default.example.tsx', 'Default')
    .addExample('ButtonAction/story/States.example.tsx', 'States')
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonAction,
  'Button.Action'
)

export default {
  chapter,
  componentDocs
}
