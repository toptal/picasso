import PicassoBook from '~/.storybook/components/PicassoBook'

import sidebarMenuStory from '@components/lab/SidebarMenu/story'
import sidebarItemStory from '@components/lab/SidebarItem/story'

import { Sidebar } from '../Sidebar'

const page = PicassoBook.createPage(
  'Sidebar',
  `Navigation items provide access to parts in your app`,
  'Lab'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Sidebar, name: 'Sidebar' })
  .addComponentDocs(sidebarMenuStory.componentDocs)
  .addComponentDocs(sidebarItemStory.componentDocs)

page
  .createChapter()
  .addExample('lab/Sidebar/story/Default.example.jsx', 'Default')
  .addExample('lab/Sidebar/story/Links.example.jsx', 'With Links')
  .addExample('lab/Sidebar/story/Variants.example.jsx', 'Variants')
  .addExample('lab/Sidebar/story/Menu.example.jsx', {
    title: 'Item Menu',
    description:
      'Sidebar.Item has capability to render nested Sidebar.Menu with collapsible prop'
  })
