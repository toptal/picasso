import { Image } from '../Image'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Image',
  'Display any types of images.'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Image, name: 'Image' })

page
  .createChapter()
  .addExample('Image/story/Default.example.jsx', {
    title: 'Default',
    waitUntilImagesLoaded: true
  })
  .addExample('Image/story/Variants.example.jsx', {
    title: 'Variants',
    waitUntilImagesLoaded: true
  })
