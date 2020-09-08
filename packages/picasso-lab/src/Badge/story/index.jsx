import { Badge } from '../Badge'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage(
  'Badge',
  'Renders a small badge to the top-right corner of its child component.'
)

page.createTabChapter('Props').addComponentDocs({
  component: Badge,
  name: 'Badge'
})

page
  .createChapter()
  .addExample('Badge/story/Variants.example.tsx', 'Variants')
  .addExample('Badge/story/Sizes.example.tsx', 'Sizes')
