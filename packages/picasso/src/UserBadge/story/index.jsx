import { UserBadge } from '../UserBadge'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'UserBadge',
  'Show user avatar and name along with addition content'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: UserBadge, name: 'UserBadge' })

page
  .createChapter()
  .addExample('UserBadge/story/Default.example.jsx', {
    title: 'Default',
    waitUntilImagesLoaded: true
  })
  .addExample('UserBadge/story/Sizes.example.jsx', {
    title: 'Sizes',
    waitUntilImagesLoaded: true
  })
  .addExample('UserBadge/story/Alignment.example.jsx', {
    title: 'Alignment',
    waitUntilImagesLoaded: true
  })
  .addExample('UserBadge/story/Invert.example.jsx', {
    title: 'Invert',
    waitUntilImagesLoaded: true
  })
  .addExample('UserBadge/story/Custom.example.jsx', {
    title: 'Custom',
    waitUntilImagesLoaded: true
  })
  .addExample('UserBadge/story/Title.example.tsx', {
    title: 'With Title',
    waitUntilImagesLoaded: true
  })
  .addExample('UserBadge/story/CustomName.example.jsx', {
    title: 'Custom Name Rendering',
    waitUntilImagesLoaded: true
  })
