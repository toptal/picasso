import PicassoBook from '~/.storybook/components/PicassoBook'

import dropdownArrowStory from '@components/DropdownArrow/story'

import { Dropdown } from '../Dropdown'

const page = PicassoBook.createPage(
  'Dropdown',
  `Allows rendering of menus and custom content triggered by custom anchors`
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Dropdown, name: 'Dropdown' })
  .addComponentDocs(dropdownArrowStory.componentDocs)

page
  .createChapter()
  .addExample('Dropdown/story/Default.example.jsx', 'Default')
  .addExample('Dropdown/story/ButtonDropdown.example.jsx', 'Button Anchor')
  .addExample(
    'Dropdown/story/PositionsAndOffsets.example.jsx',
    'Positions & Offsets'
  )
  .addExample('Dropdown/story/CustomTrigger.example.jsx', 'Custom Anchor')
  .addExample('Dropdown/story/CustomContent.example.jsx', 'Custom Content')
