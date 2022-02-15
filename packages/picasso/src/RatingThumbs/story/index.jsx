import PicassoBook from '~/.storybook/components/PicassoBook'
import { RatingThumbs } from '../RatingThumbs'

const chapter = PicassoBook.connectToPage(
  page =>
    page
      .createChapter('Thumbs Rating')
      .addExample('RatingThumbs/story/Default.example.tsx', {
        title: 'Default',
        description: 'Default behavior'
      }) // picasso-skip-visuals
      .addExample('RatingThumbs/story/NonInteractive.example.tsx', {
        title: 'Non Interactive',
        description:
          'Rating thumbs can be non-interactive. In this mode the user cannot change its value'
      }) // picasso-skip-visuals
      .addExample('RatingThumbs/story/Sizes.example.tsx', {
        title: 'Different sizes',
        description:
          'There are 2 options of sizes for the RatingThumbs component: small (default) and large'
      }) // picasso-skip-visuals
)

const componentDocs = PicassoBook.createComponentDocs(
  RatingThumbs,
  'Rating.Thumbs'
)

export default {
  chapter,
  componentDocs
}
