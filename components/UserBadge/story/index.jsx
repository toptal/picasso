import PicassoBook from '../../../.storybook/components/PicassoBook'
import { UserBadge } from '../UserBadge'

const page = PicassoBook.createPage('UserBadge', `<-- description -->`)

page
  .addComponentDocs(UserBadge)
  .addExample('UserBadge/story/Default.example.jsx', 'Default')
  .addExample('UserBadge/story/Sizes.example.jsx', 'Sizes')
  .addExample('UserBadge/story/Invert.example.jsx', 'Invert')
  .addExample('UserBadge/story/Custom.example.jsx', 'Custom')
