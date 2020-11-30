import { OverlayLoader } from '../OverlayLoader'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage(
  'OverlayLoader',
  'Use to OverlayLoader user about important information'
)

page.createTabChapter('Props').addComponentDocs({
  component: OverlayLoader,
  name: 'OverlayLoader'
})

page
  .createChapter()
  .addExample('OverlayLoader/story/Default.example.tsx', 'Default')
  .addExample('OverlayLoader/story/Size.example.tsx', 'Size')
  .addExample('OverlayLoader/story/Position.example.tsx', 'Position')
