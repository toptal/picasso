import { Avatar } from '../Avatar'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Avatar',
  `
    Profile photo.

    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/24f865c1-777a-4b7e-9c5b-cfe0d499f952?collectionLayerId=c74010be-d61e-40c8-be12-295ff4fef529&mode=design&present=true'
    )}

    Additional notes:
      * The shape of clipped corner has a fallback for <=IE11, Edge to just a rectangle
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Avatar, name: 'Avatar' })

page
  .createChapter()
  .addExample('Avatar/story/Default.example.tsx', {
    title: 'Default',
    waitUntilImagesLoaded: true
  }) // picasso-skip-visuals
  .addExample('Avatar/story/Variants.example.tsx', {
    title: 'Variants',
    waitUntilImagesLoaded: true
  }) // picasso-skip-visuals
  .addExample('Avatar/story/Sizes.example.tsx', {
    title: 'Sizes',
    waitUntilImagesLoaded: true
  }) // picasso-skip-visuals
  .addExample('Avatar/story/LongName.example.tsx', {
    title: 'Long Name',
    waitUntilImagesLoaded: true
  })
