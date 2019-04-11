import PicassoBook from '../../../.storybook/components/PicassoBook'
import { Stepper } from '../Stepper'

const page = PicassoBook.createPage('Stepper', `<-- description -->`)

page
  .addComponentDocs(Stepper)
  .addExample('Stepper/story/Default.example.jsx', 'Default')
