import { UserBadge } from '../UserBadge'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'UserBadge',
  'Show user avatar and name along with addition content'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: UserBadge, name: 'UserBadge' })

page
  .createChapter()
  .addExample('UserBadge/story/Default.example.jsx', 'Default', {
    waitUntilImagesLoaded: true
  })
  .addExample('UserBadge/story/Sizes.example.jsx', 'Sizes', {
    waitUntilImagesLoaded: true
  })
  .addExample('UserBadge/story/Alignment.example.jsx', 'Alignment', {
    waitUntilImagesLoaded: true
  })
  .addExample('UserBadge/story/Invert.example.jsx', 'Invert', {
    waitUntilImagesLoaded: true
  })
  .addExample('UserBadge/story/Custom.example.jsx', 'Custom', {
    waitUntilImagesLoaded: true
  })
  .addExample('UserBadge/story/Title.example.jsx', 'With Title', {
    waitUntilImagesLoaded: true
  })
