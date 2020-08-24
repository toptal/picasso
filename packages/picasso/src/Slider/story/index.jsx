import { Slider } from '../Slider'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Slider',
  'Slider is used to pick a numeric value from the predefined range'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Slider, name: 'Slider' })

page
  .createChapter()
  .addExample('Slider/story/Default.example.jsx', 'Default')
  .addExample('Slider/story/InitialValue.example.jsx', 'Initial value')
  .addExample('Slider/story/Controlled.example.jsx', 'Controlled value')
  .addExample('Slider/story/Tooltip.example.jsx', 'Tooltip')
  .addExample('Slider/story/Range.example.jsx', 'Range')
  .addExample('Slider/story/Marks.example.jsx', 'Marks')
  .addExample('Slider/story/CustomTooltip.example.jsx', 'Custom Tooltip') // picasso-skip-visuals
  .addExample(
    'Slider/story/HideThumb.example.jsx',
    'Hide thumb when value is null or undefined'
  )
  .addExample(
    'Slider/story/DisableTrackHighlight.example.jsx',
    'Disable track highlight'
  )
