import dropdownArrowStory from '../../DropdownArrow/story'
import { Dropdown } from '../Dropdown'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Dropdown',
  'Allows rendering of menus and custom content triggered by custom anchors'
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: Dropdown,
    name: 'Dropdown',
    additionalDocs: {
      contentOverflow: {
        name: 'contentOverflow',
        type: {
          name: 'enum',
          enums: ['scroll', 'visible']
        },
        defaultValue: 'scroll',
        description: "Sets the desired behavior for an element's overflow. When `scroll` it limits max-height of a content of the dropdown. When `visible` it displays as much content as it possible without vertical scrollbar."
      }
    }
  })
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
    }
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
  .addExample('Dropdown/story/LongMenuList.example.tsx', 'Long Menu List') // picasso-skip-visuals
