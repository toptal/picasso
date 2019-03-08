import PicassoBook from '../../../.storybook/components/PicassoBook'
import { Container } from '../Container'

const page = PicassoBook.createPage(
  'Container',
  'Use Container to add space between 2 elements.'
)

page
  .addComponentDocs(Container)
  .addExample('Container/story/Default.example.jsx', 'Default')
  .addExample('Container/story/Inline.example.jsx', 'Inline')
