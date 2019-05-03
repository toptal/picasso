import PicassoBook from '~/.storybook/components/PicassoBook'

import menuItemStory from '@components/MenuItem/story'

import { Menu } from '../Menu'

const page = PicassoBook.createPage('Menu', `Menu list.`)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Menu, name: 'Menu' })
  .addComponentDocs(menuItemStory.componentDocs)

page.createChapter().addExample('Menu/story/Default.example.jsx', 'Default')

page.connect(menuItemStory.chapter)
