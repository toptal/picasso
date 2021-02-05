import { Badge } from '../Badge'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Lab').createPage(
  'Badge',
  'Renders a small badge.'
)

page.createTabChapter('Props').addComponentDocs({
  component: Badge,
  name: 'Badge'
})

page
  .createChapter()
  .addExample('Badge/story/Variants.example.tsx', 'Variants')
  .addExample('Badge/story/Sizes.example.tsx', 'Sizes')
