import PicassoBook from '../../../.storybook/components/PicassoBook'
import { Paper } from '../Paper'

const page = PicassoBook.createPage('Paper', `Elevated container with shadow`)

page
  .addComponentDocs(Paper)
  .addExample('Paper/story/Default.example.jsx', 'Default')
