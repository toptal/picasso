import PicassoBook from '~/.storybook/components/PicassoBook'
import { RatingThumbs } from '../RatingThumbs'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Thumbs Rating', `FIXME`)
    .addExample('RatingThumbs/story/Default.example.tsx', 'Default')
)

const componentDocs = PicassoBook.createComponentDocs(
  RatingThumbs,
  'Rating.Thumbs'
)

export default {
  chapter,
  componentDocs
}
