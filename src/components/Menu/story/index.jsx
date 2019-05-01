import PicassoBook from '~/.storybook/components/PicassoBook'

import { Menu } from '../Menu'

const page = PicassoBook.createPage(
  'Menu',
  `Drop menu, structural component for Dropdown or Select component.`
)

page
  .addComponentDocs(Menu)
  .addExample('Menu/story/Default.example.jsx', 'Default')
  .addExample('Menu/story/FullAnchorWidth.example.jsx', "Full anchor's width")
  .addExample('Menu/story/List.example.jsx', 'List')
