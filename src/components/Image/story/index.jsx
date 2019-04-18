import PicassoBook from '~/.storybook/components/PicassoBook'

import { Image } from '../Image'

const page = PicassoBook.createPage('Image', `Display any types of images.`)

page
  .addComponentDocs(Image)
  .addExample('Image/story/Default.example.jsx', 'Default')
  .addExample('Image/story/Variants.example.jsx', 'Variants')
