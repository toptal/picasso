import PicassoBook from '.storybook/components/PicassoBook'

import { Avatar } from '../Avatar'

const page = PicassoBook.createPage(
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
  .addComponentDocs(Avatar)
  .addExample('Avatar/story/Default.example.jsx', 'Default')
  .addExample('Avatar/story/Variants.example.jsx', 'Variants')
  .addExample('Avatar/story/Sizes.example.jsx', 'Sizes')
