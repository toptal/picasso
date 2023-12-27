import { UserBadge } from '../UserBadge'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'UserBadge',
  `Show user avatar and name along with addition content
  
  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: UserBadge, name: 'UserBadge' })

page
  .createChapter()
  .addExample('UserBadge/story/Default.example.tsx', 'Default')
  .addExample('UserBadge/story/Sizes.example.tsx', 'Sizes')
  .addExample('UserBadge/story/Alignment.example.tsx', 'Alignment')
  .addExample('UserBadge/story/Invert.example.tsx', 'Invert')
  .addExample('UserBadge/story/Custom.example.tsx', 'Custom')
  .addExample('UserBadge/story/Title.example.tsx', 'With Title')
