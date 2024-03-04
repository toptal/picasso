import { Slider } from '../Slider'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Slider',
  `Slider is used to pick a numeric value from the predefined range
  
   ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Slider, name: 'Slider' })

page
  .createChapter()
  .addExample('Slider/story/Default.example.tsx', 'Default', 'base/Slider')
  .addExample(
    'Slider/story/InitialValue.example.tsx',
    'Initial value',
    'base/Slider'
  )
  .addExample(
    'Slider/story/Controlled.example.tsx',
    'Controlled value',
    'base/Slider'
  )
  .addExample(
    'Slider/story/ControlledWithLabel.example.tsx',
    {
      title: 'Controlled value with label',
      takeScreenshot: false,
    },
    'base/Slider'
  )
  .addExample(
    'Slider/story/MinMaxValueLabel.example.tsx',
    {
      title: 'Minimum and Maximum value with label',
      takeScreenshot: false,
    },
    'base/Slider'
  )
  .addExample('Slider/story/Tooltip.example.tsx', 'Tooltip', 'base/Slider')
  .addExample('Slider/story/Range.example.tsx', 'Range', 'base/Slider')
  .addExample(
    'Slider/story/RangeWithValueLabel.example.tsx',
    {
      title: 'Range with value label',
      takeScreenshot: false,
    },
    'base/Slider'
  )
  .addExample('Slider/story/Marks.example.tsx', 'Marks', 'base/Slider')
  .addExample(
    'Slider/story/CustomTooltip.example.tsx',
    {
      title: 'Custom Tooltip',
      takeScreenshot: false,
    },
    'base/Slider'
  )
  .addExample(
    'Slider/story/HideThumb.example.tsx',
    'Hide thumb when value is null or undefined',
    'base/Slider'
  )
  .addExample(
    'Slider/story/DisableTrackHighlight.example.tsx',
    'Disable track highlight',
    'base/Slider'
  )
