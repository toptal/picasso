import { HeaderLoader } from '../HeaderLoader'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  HeaderLoader,
  'SkeletonLoader.Header'
)

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('SkeletonLoader.Header')
    .addExample('HeaderLoader/story/Default.example.tsx', 'Default')
)

export default {
  componentDocs,
  chapter
}
