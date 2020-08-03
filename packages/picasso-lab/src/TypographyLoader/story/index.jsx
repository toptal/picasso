import { TypographyLoader } from '../TypographyLoader'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  TypographyLoader,
  'SkeletonLoader.Typography'
)

const chapter = PicassoBook.connectToPage(
  page =>
    page
      .createChapter('SkeletonLoader.Typography')
      .addExample('TypographyLoader/story/Default.example.tsx', {
        id: 'TypographyLoader',
        waitUntilImagesLoaded: true
      }) // picasso-skip-visuals
)

export default {
  componentDocs,
  chapter
}
