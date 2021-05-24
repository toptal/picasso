import { HeaderLoader } from '../HeaderLoader'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  HeaderLoader,
  'SkeletonLoader.Header'
)

const chapter = PicassoBook.connectToPage(
  page =>
    page
      .createChapter('SkeletonLoader.Header')
      .addExample('HeaderLoader/story/Default.example.tsx', {
        id: 'HeaderLoader',
        waitUntilImagesLoaded: true
      }) // picasso-skip-visuals
)

export default {
  componentDocs,
  chapter
}
