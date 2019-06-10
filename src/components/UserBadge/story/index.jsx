import PicassoBook from '~/.storybook/components/PicassoBook'

import { UserBadge } from '../UserBadge'

const page = PicassoBook.createPage(
  'UserBadge',
  `Show user avatar and name along with addition content`
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: UserBadge, name: 'UserBadge' })

page
  .createChapter()
  .addExample('UserBadge/story/Default.example.jsx', 'Default')
  .addExample('UserBadge/story/Sizes.example.jsx', 'Sizes')
  .addExample('UserBadge/story/Alignment.example.jsx', 'Alignment')
  .addExample('UserBadge/story/Invert.example.jsx', 'Invert')
  .addExample('UserBadge/story/Custom.example.jsx', 'Custom')
  .addExample('UserBadge/story/Title.example.jsx', 'With Title')
