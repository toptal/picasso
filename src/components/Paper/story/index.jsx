import PicassoBook from '~/.storybook/components/PicassoBook'

import { Paper } from '../Paper'

const page = PicassoBook.createPage(
  'Paper',
  `Elevated container with shadow`,
  'Layout'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Paper, name: 'Paper' })

page.createChapter().addExample('Paper/story/Default.example.jsx', 'Default')
