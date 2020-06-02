import { Avatar } from '../Avatar'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Avatar',
  `
    Profile photo.

    &nbsp;  
    &nbsp;  
    Additional notes:
      * The shape of clipped corner has a fallback for <=IE11, Edge to just a rectangle
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Avatar, name: 'Avatar' })

page
  .createChapter()
  .addExample('Avatar/story/Default.example.jsx', {
    title: 'Default',
    waitUntilImagesLoaded: true
  })
  .addExample('Avatar/story/Variants.example.jsx', {
    title: 'Variants',
    waitUntilImagesLoaded: true
  })
  .addExample('Avatar/story/Sizes.example.jsx', {
    title: 'Sizes',
    waitUntilImagesLoaded: true
  })
