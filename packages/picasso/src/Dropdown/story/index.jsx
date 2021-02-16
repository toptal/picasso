import dropdownArrowStory from '../../DropdownArrow/story'
import { Dropdown } from '../Dropdown'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Dropdown',
  'Allows rendering of menus and custom content triggered by custom anchors'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Dropdown, name: 'Dropdown' })
  .addComponentDocs(dropdownArrowStory.componentDocs)

page
  .createChapter()
  .addExample('Dropdown/story/Default.example.tsx', {
    title: 'Default',
    effect: async (testPage, makeScreenshot) => {
      await testPage.click('[data-testid="trigger"]')

      await makeScreenshot({
        selector: '[data-testid="menu"]'
      })
    },
    takeScreenshot: false
  })
  .addExample('Dropdown/story/ButtonDropdown.example.tsx', 'Button Anchor')
  .addExample(
    'Dropdown/story/PositionsAndOffsets.example.tsx',
    'Positions & Offsets'
  )
  .addExample('Dropdown/story/CustomTrigger.example.tsx', {
    title: 'Custom Anchor',
    waitUntilImagesLoaded: true
  })
  .addExample('Dropdown/story/CustomContent.example.tsx', 'Custom Content')
  .addExample('Dropdown/story/SmallArrow.example.tsx', 'Small Arrow Dropdown')
