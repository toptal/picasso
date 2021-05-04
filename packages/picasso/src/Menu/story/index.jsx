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
  .addExample('Menu/story/Default.example.tsx', 'Default') // picasso-skip-visuals
  .addExample('Menu/story/Nested.example.tsx', 'Nested') // picasso-skip-visuals
  .addExample('Menu/story/Dropdown.example.tsx', 'Dropdown') // picasso-skip-visuals

page.connect(menuItemStory.chapter)
