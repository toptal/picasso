import dropdownArrowStory from '../../DropdownArrow/story'
import { Dropdown } from '../Dropdown'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Dropdown',
  'Allows rendering of menus and custom content triggered by custom anchors'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Dropdown, name: 'Dropdown' })
  .addComponentDocs(dropdownArrowStory.componentDocs)

page
  .createChapter()
  .addExample('Dropdown/story/Default.example.jsx', {
    title: 'Default',
    effect: async (testPage, makeScreenshot) => {
      await testPage.click('[data-testid="trigger"]')

      await makeScreenshot({
        selector: '[data-testid="menu"]'
      })

      await testPage.keyboard.press('ArrowDown')
      await testPage.waitFor(250)

      await makeScreenshot({
        selector: '[data-testid="menu"]'
      })
    }
  })
  .addExample('Dropdown/story/ButtonDropdown.example.jsx', 'Button Anchor')
  .addExample(
    'Dropdown/story/PositionsAndOffsets.example.jsx',
    'Positions & Offsets'
  )
  .addExample('Dropdown/story/CustomTrigger.example.jsx', 'Custom Anchor')
  .addExample('Dropdown/story/CustomContent.example.jsx', 'Custom Content')
  .addExample('Dropdown/story/SmallArrow.example.jsx', 'Small Arrow Dropdown')
