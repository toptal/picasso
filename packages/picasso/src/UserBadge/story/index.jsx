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
  .addExample('UserBadge/story/Default.example.tsx', {
    title: 'Default',
    waitUntilImagesLoaded: true
  })
  .addExample('UserBadge/story/Sizes.example.tsx', {
    title: 'Sizes',
    waitUntilImagesLoaded: true
  })
  .addExample('UserBadge/story/Alignment.example.tsx', {
    title: 'Alignment',
    waitUntilImagesLoaded: true
  })
  .addExample('UserBadge/story/Invert.example.tsx', {
    title: 'Invert',
    waitUntilImagesLoaded: true
  })
  .addExample('UserBadge/story/Custom.example.tsx', {
    title: 'Custom',
    waitUntilImagesLoaded: true
  })
  .addExample('UserBadge/story/Title.example.tsx', {
    title: 'With Title',
    waitUntilImagesLoaded: true
  })
