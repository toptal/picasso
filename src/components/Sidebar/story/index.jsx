import PicassoBook from '~/.storybook/components/PicassoBook'

import sidebarMenuStory from '@components/SidebarMenu/story'
import sidebarItemStory from '@components/SidebarItem/story'

import { Sidebar } from '../Sidebar'

const page = PicassoBook.createPage(
  'Sidebar',
  `Navigation items provide access to parts in your app`,
  'Layout'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Sidebar, name: 'Sidebar' })
  .addComponentDocs(sidebarMenuStory.componentDocs)
  .addComponentDocs(sidebarItemStory.componentDocs)

page
  .createChapter()
  .addExample('Sidebar/story/Default.example.jsx', 'Default')
  .addExample('Sidebar/story/Links.example.jsx', 'Links')
