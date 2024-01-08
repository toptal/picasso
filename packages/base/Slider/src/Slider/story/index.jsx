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
  .addExample('Slider/story/Default.example.tsx', 'Default')
  .addExample('Slider/story/InitialValue.example.tsx', 'Initial value')
  .addExample('Slider/story/Controlled.example.tsx', 'Controlled value')
  .addExample('Slider/story/ControlledWithLabel.example.tsx', {
    title: 'Controlled value with label',
    takeScreenshot: false,
  })
  .addExample('Slider/story/MinMaxValueLabel.example.tsx', {
    title: 'Minimum and Maximum value with label',
    takeScreenshot: false,
  })
  .addExample('Slider/story/Tooltip.example.tsx', 'Tooltip')
  .addExample('Slider/story/Range.example.tsx', 'Range')
  .addExample('Slider/story/RangeWithValueLabel.example.tsx', {
    title: 'Range with value label',
    takeScreenshot: false,
  })
  .addExample('Slider/story/Marks.example.tsx', 'Marks')
  .addExample('Slider/story/CustomTooltip.example.tsx', {
    title: 'Custom Tooltip',
    takeScreenshot: false,
  })
  .addExample(
    'Slider/story/HideThumb.example.tsx',
    'Hide thumb when value is null or undefined'
  )
  .addExample(
    'Slider/story/DisableTrackHighlight.example.tsx',
    'Disable track highlight'
  )
