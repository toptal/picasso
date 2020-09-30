import { ButtonAction } from '../ButtonAction'
// @ts-ignore
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage((page: any) =>
  page
    .createChapter('Action Button', 'Action Style Button.')
    .addExample('ButtonAction/story/Default.example.jsx', 'Default')
    .addExample('ButtonAction/story/States.example.jsx', 'States')
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonAction,
  'Button.Action'
)

export default {
  chapter,
  componentDocs
}
