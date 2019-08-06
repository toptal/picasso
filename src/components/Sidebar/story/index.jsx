import PicassoBook from '~/.storybook/components/PicassoBook'

import { Sidebar } from '../Sidebar'

const page = PicassoBook.createPage('Sidebar', `<-- description -->`)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Sidebar, name: 'Sidebar' })

page.createChapter().addExample('Sidebar/story/Default.example.jsx', 'Default')
