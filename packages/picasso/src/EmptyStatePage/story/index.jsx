import { EmptyStatePage } from '../EmptyStatePage'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  EmptyStatePage,
  'EmptyState.Page'
)

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('EmptyState.Page')
    .addExample('EmptyStatePage/story/Default.example.tsx', {
      id: 'EmptyStatePage',
      waitUntilImagesLoaded: true
    })
)

export default {
  componentDocs,
  chapter
}
