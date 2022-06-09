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
  .addExample('Menu/story/Default.example.tsx', {
    title: 'Default',
    takeScreenshot: false,
  })
  .addExample('Menu/story/Nested.example.tsx', {
    title: 'Nested',
    takeScreenshot: false,
  })
  .addExample('Menu/story/Dropdown.example.tsx', {
    title: 'Dropdown',
    takeScreenshot: false,
  })

page.connect(menuItemStory.chapter)
