import PicassoBook from '~/.storybook/components/PicassoBook'

import { Tabs } from '../Tabs'

import tabStory from '@components/Tab/story'

const page = PicassoBook.createPage(
  'Tabs',
  'Tabs allow to switch between content sections',
  'Layout'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Tabs, name: 'Tabs' })
  .addComponentDocs(tabStory.componentDocs)

page.createChapter().addExample('Tabs/story/Default.example.jsx', 'Default')
page.connect(tabStory.chapter)
