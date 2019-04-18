import PicassoBook from '~/.storybook/components/PicassoBook'

import { Stepper } from '../Stepper'

const page = PicassoBook.createPage(
  'Stepper',
  `Stepper component display progress through a sequence of steps.`
)

page
  .addComponentDocs(Stepper)
  .addExample('Stepper/story/Default.example.jsx', 'Default')
  .addExample('Stepper/story/Variants.example.jsx', 'Variants')
  .addExample('Stepper/story/FullWidth.example.jsx', 'Full width')
