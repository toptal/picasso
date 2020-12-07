import sidebarMenuStory from '../../SidebarMenu/story'
import sidebarItemStory from '../../SidebarItem/story'
import sidebarLogoStory from '../../SidebarLogo/story'
import { Sidebar } from '../Sidebar'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Sidebar',
  'Navigation items provide access to parts in your app'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Sidebar, name: 'Sidebar' })
  .addComponentDocs(sidebarMenuStory.componentDocs)
  .addComponentDocs(sidebarItemStory.componentDocs)
  .addComponentDocs(sidebarLogoStory.componentDocs)

page
  .createChapter()
  .addExample('Sidebar/story/Default.example.tsx', 'Default')
  .addExample('Sidebar/story/Menu.example.tsx', {
    title: 'Collapsible',
    description:
      'Sidebar.Item has capability to render nested Sidebar.Menu with collapsible prop',
    effect: async (testPage, makeScreenshot) => {
      await testPage.click('[test-id="Referrals"]')
      await testPage.waitFor(100)
      await makeScreenshot()
    }
  })
  .addExample('Sidebar/story/DefaultExpanded.example.tsx', {
    title: 'Expanded By Default',
    description:
      'When a nested Sidebar.Item is selected, it automatically expands the menu.'
  })
  .addExample('Sidebar/story/Links.example.tsx', 'With Links')
  .addExample('Sidebar/story/Icons.example.tsx', 'Icons')
  .addExample('Sidebar/story/Variants.example.tsx', 'Variants')
