import menuItemStory from '../../MenuItem/story'
import { Menu } from '../Menu'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage('Menu', 'Menu list.')

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Menu, name: 'Menu' })
  .addComponentDocs(menuItemStory.componentDocs)

page
  .createChapter()
  .addExample('Menu/story/Default.example.tsx', 'Default')
  .addExample('Menu/story/Drilldown.example.tsx', 'Drill Down')

page.connect(menuItemStory.chapter)
