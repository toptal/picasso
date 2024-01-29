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
  .addExample(
    'UserBadge/story/Default.example.tsx',
    'Default',
    'base/UserBadge'
  )
  .addExample('UserBadge/story/Sizes.example.tsx', 'Sizes', 'base/UserBadge')
  .addExample(
    'UserBadge/story/Alignment.example.tsx',
    'Alignment',
    'base/UserBadge'
  )
  .addExample('UserBadge/story/Invert.example.tsx', 'Invert', 'base/UserBadge')
  .addExample('UserBadge/story/Custom.example.tsx', 'Custom', 'base/UserBadge')
  .addExample(
    'UserBadge/story/Title.example.tsx',
    'With Title',
    'base/UserBadge'
  )
