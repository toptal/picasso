import PicassoBook from '~/.storybook/components/PicassoBook'

import { TagSelector } from '../TagSelector'

const page = PicassoBook.createPage('TagSelector', `<-- description -->`)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: TagSelector, name: 'TagSelector' })

page
  .createChapter()
  .addExample('TagSelector/story/Default.example.jsx', 'Default')
