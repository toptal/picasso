import PicassoBook from '~/.storybook/components/PicassoBook'

import sidebarMenuStory from '@components/lab/SidebarMenu/story'
import sidebarItemStory from '@components/lab/SidebarItem/story'
import sidebarLogoStory from '@components/lab/SidebarLogo/story'

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
  .addComponentDocs(sidebarLogoStory.componentDocs)

page
  .createChapter()
  .addExample(
    'lab/Sidebar/story/ExpandedByRouting.example.jsx',
    'Expanded By Routing'
  )
/* .addExample('lab/Sidebar/story/Default.example.jsx', 'Default')
  .addExample('lab/Sidebar/story/Links.example.jsx', 'With Links')
  .addExample('lab/Sidebar/story/WithoutIcons.example.jsx', 'Without Icons')
  .addExample('lab/Sidebar/story/Variants.example.jsx', 'Variants')
  .addExample('lab/Sidebar/story/Menu.example.jsx', {
    title: 'Item Menu',
    description:
      'Sidebar.Item has capability to render nested Sidebar.Menu with collapsible prop'
  }) */
