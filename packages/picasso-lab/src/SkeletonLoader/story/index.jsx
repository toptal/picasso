import SkeletonLoader from '../SkeletonLoader'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage(
  'SkeletonLoader',
  'SkeletonLoader'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: SkeletonLoader, name: 'SkeletonLoader' })

page
  .createChapter()
  .addExample('SkeletonLoader/story/Default.example.tsx', 'Default')
  .addExample('SkeletonLoader/story/Dynamic.example.tsx', 'Dynamic')
