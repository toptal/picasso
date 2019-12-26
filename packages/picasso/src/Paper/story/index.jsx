import { Paper } from '../Paper'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Paper',
  'Elevated container with shadow',
  'Layout'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Paper, name: 'Paper' })

page.createChapter().addExample('Paper/story/Default.example.jsx', 'Default')
