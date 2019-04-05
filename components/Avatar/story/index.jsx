import PicassoBook from '../../../.storybook/components/PicassoBook'
import { Avatar } from '../Avatar'

const page = PicassoBook.createPage('Avatar', `Profile photo.`)

page
  .addComponentDocs(Avatar)
  .addExample('Avatar/story/Default.example.jsx', 'Default')
  .addExample('Avatar/story/Variants.example.jsx', 'Variants')
  .addExample('Avatar/story/Sizes.example.jsx', 'Sizes')
