import { TopBarMenu } from '../TopBarMenu'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  TopBarMenu,
  'Page.TopBar.Menu'
)

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter(
      'Page.TopBar.Menu',
      `
      Menu for center content of TopBar.
      
      Maximum 6 items is allowed.

      Both TopBarMenu and Sidebar menu items are displayed in hamburger on small screens.
    `
    )
    .addExample('TopBarMenu/story/Default.example.tsx', 'Default')
    .addExample('TopBarMenu/story/WithIcons.example.tsx', 'With Icons')
    .addExample(
      'TopBarMenu/story/WithSidebar.example.tsx',
      'TopBar Menu with Sidebar'
    )
)

export default {
  chapter,
  componentDocs,
}
