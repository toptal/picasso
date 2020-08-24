import { MediaSkeletonLoader } from '../MediaSkeletonLoader'
// @ts-ignore
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  MediaSkeletonLoader,
  'SkeletonLoader.Media'
)

const chapter = PicassoBook.connectToPage(
  (page: any) =>
    page
      .createChapter('SkeletonLoader.Media')
      .addExample('MediaSkeletonLoader/story/Default.example.tsx', {
        id: 'MediaSkeletonLoader',
        waitUntilImagesLoaded: true
      }) // picasso-skip-visuals
)

export default {
  componentDocs,
  chapter
}
