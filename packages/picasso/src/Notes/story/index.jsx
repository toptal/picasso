import PicassoBook from '~/.storybook/components/PicassoBook'
import { Notes } from '../Notes'

const page = PicassoBook.section('Components').createPage(
  'Notes',
  `<-- description -->`
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Notes, name: 'Notes' })
  .addExample('Notes/story/Default.example.tsx', 'Default')
page.createChapter()
