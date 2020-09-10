import { OverlayBadge } from '../OverlayBadge'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage(
  'OverlayBadge',
  'Renders a small badge to the top-right corner of its child component.'
)

page.createTabChapter('Props').addComponentDocs({
  component: OverlayBadge,
  name: 'OverlayBadge'
})

page
  .createChapter()
  .addExample('OverlayBadge/story/Variants.example.tsx', 'Variants')
  .addExample('OverlayBadge/story/Sizes.example.tsx', 'Sizes')
