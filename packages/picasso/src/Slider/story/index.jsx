import PicassoBook from '~/.storybook/components/PicassoBook'

import { Slider } from '../Slider'

const page = PicassoBook.createPage(
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
