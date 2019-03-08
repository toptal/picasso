import PicassoBook from '../../../.storybook/components/PicassoBook'
import { Typography } from '../Typography'

const page = PicassoBook.createPage(
  'Typography',
  'Our primary typeface is Proxima Nova, a contemporary font that combines humanist proportions with a geometric appearance—making it the perfect typeface.'
)

page
  .addComponentDocs(Typography)
  .addExample('Typography/story/Default.example.jsx', 'Normal text')
  .addExample('Typography/story/Headings.example.jsx', 'Headings')
  .addExample('Typography/story/Types.example.jsx', {
    title: 'Types',
    description:
      'Long-form text uses a 1.5 ratio to calculate line-height values.'
  })
  .addExample('Typography/story/Alignment.example.jsx', 'Alignment')
  .addExample('Typography/story/Weights.example.jsx', 'Weights')
