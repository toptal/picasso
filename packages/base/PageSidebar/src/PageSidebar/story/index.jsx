import sidebarMenuStory from '../../SidebarMenu/story'
import sidebarItemStory from '../../SidebarItem/story'
import sidebarLogoStory from '../../SidebarLogo/story'
import { PageSidebar } from '../PageSidebar'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'PageSidebar',
  `Navigation items provide access to parts in your app

  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: PageSidebar, name: 'PageSidebar' })
  .addComponentDocs(sidebarMenuStory.componentDocs)
  .addComponentDocs(sidebarItemStory.componentDocs)
  .addComponentDocs(sidebarLogoStory.componentDocs)

page
  .createChapter()
  .addExample('PageSidebar/story/Default.example.tsx', {
    title: 'Default',
    takeScreenshot: false,
  })
  .addExample('PageSidebar/story/Variants.example.tsx', {
    title: 'Variants',
    takeScreenshot: false,
  })
  .addExample('PageSidebar/story/Collapsible.example.tsx', {
    title: 'Collapsible',
    takeScreenshot: false,
  })
  .addExample('PageSidebar/story/Size.example.tsx', {
    title: 'Sizes',
    screenshotBreakpoints: true,
  })

page.connect(sidebarItemStory.chapter)
