import { Image } from '../Image'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage('Image', 'Display any types of images.')

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Image, name: 'Image' })

page
  .createChapter()
  .addExample('Image/story/Default.example.jsx', 'Default')
  .addExample('Image/story/Variants.example.jsx', 'Variants')
