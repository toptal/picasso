import PicassoBook from '~/.storybook/components/PicassoBook'

import { Slider } from '../Slider'

const page = PicassoBook.createPage(
  'Slider',
  'Slider is used to pick a numeric value from the predefined range',
  'Lab'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Slider, name: 'Slider' })

page
  .createChapter()
  .addExample('lab/Slider/story/Default.example.jsx', 'Default')
  .addExample('lab/Slider/story/InitialValue.example.jsx', 'Initial value')
  .addExample('lab/Slider/story/Controlled.example.jsx', 'Controlled value')
