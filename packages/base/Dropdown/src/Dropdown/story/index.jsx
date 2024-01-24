import dropdownArrowStory from '../../DropdownArrow/story'
import { Dropdown } from '../Dropdown'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Dropdown',
  `Allows rendering of menus and custom content triggered by custom anchors

  ${PicassoBook.createSourceLink(__filename)}
  `
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
          enums: ['scroll', 'visible'],
        },
        defaultValue: 'scroll',
        description:
          "Sets the desired behavior for an element's overflow. When `scroll` it limits max-height of a content of the dropdown. When `visible` it displays as much content as it possible without vertical scrollbar.",
      },
    },
  })
  .addComponentDocs(dropdownArrowStory.componentDocs)

page
  .createChapter()
  .addExample('Dropdown/story/Default.example.tsx', 'Default', 'base/Dropdown')
  .addExample(
    'Dropdown/story/ButtonDropdown.example.tsx',
    'Button Anchor',
    'base/Dropdown'
  )
  .addExample(
    'Menu/story/Default.example.tsx',
    {
      title: 'Dropdown menu',
      takeScreenshot: false,
    },
    'base/Dropdown'
  )
  .addExample(
    'Menu/story/Multilevel.example.tsx',
    {
      title: 'Multilevel menu',
      takeScreenshot: false,
    },
    'base/Dropdown'
  )
  .addExample(
    'Dropdown/story/PositionsAndOffsets.example.tsx',
    'Positions & Offsets',
    'base/Dropdown'
  )
  .addExample(
    'Dropdown/story/CustomTrigger.example.tsx',
    'Custom Anchor',
    'base/Dropdown'
  )
  .addExample(
    'Dropdown/story/CustomContent.example.tsx',
    {
      title: 'Custom Content',
      takeScreenshot: false,
    },
    'base/Dropdown'
  )
  .addExample(
    'Dropdown/story/SmallArrow.example.tsx',
    'Small Arrow Dropdown',
    'base/Dropdown'
  )
  .addExample(
    'Dropdown/story/LongMenuList.example.tsx',
    {
      title: 'Long Menu List',
      takeScreenshot: false,
    },
    'base/Dropdown'
  )
  .addExample(
    'Dropdown/story/CustomStyle.example.tsx',
    {
      title: 'Custom Style',
      takeScreenshot: false,
    },
    'base/Dropdown'
  )
