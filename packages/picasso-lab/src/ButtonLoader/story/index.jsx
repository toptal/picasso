import { ButtonLoader } from '../ButtonLoader'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  ButtonLoader,
  'SkeletonLoader.Button'
)

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('SkeletonLoader.Button')
    .addExample('ButtonLoader/story/Default.example.tsx', {
      id: 'ButtonLoader',
      waitUntilImagesLoaded: true
    })
)

export default {
  componentDocs,
  chapter
}
