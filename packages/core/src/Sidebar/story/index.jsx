import PicassoBook from '~/.storybook/components/PicassoBook'

import sidebarMenuStory from '../../SidebarMenu/story'
import sidebarItemStory from '../../SidebarItem/story'
import sidebarLogoStory from '../../SidebarLogo/story'
import { Sidebar } from '../Sidebar'

const page = PicassoBook.createPage(
  'Sidebar',
  `Navigation items provide access to parts in your app`
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Sidebar, name: 'Sidebar' })
  .addComponentDocs(sidebarMenuStory.componentDocs)
  .addComponentDocs(sidebarItemStory.componentDocs)
  .addComponentDocs(sidebarLogoStory.componentDocs)

page
  .createChapter()
  .addExample('Sidebar/story/Default.example.jsx', 'Default')
  .addExample(
    'Sidebar/story/DefaultExpanded.example.jsx',
    'Expanded By Default'
  )
  .addExample('Sidebar/story/Links.example.tsx', 'With Links')
  .addExample('Sidebar/story/WithoutIcons.example.jsx', 'Without Icons')
  .addExample('Sidebar/story/Variants.example.jsx', 'Variants')
  .addExample('Sidebar/story/Menu.example.jsx', {
    title: 'Item Menu',
    description:
      'Sidebar.Item has capability to render nested Sidebar.Menu with collapsible prop'
  })
