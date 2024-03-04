import AvatarGroup from '../AvatarGroup'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Avatar Group')
    .addExample(
      'AvatarGroup/story/Default.example.tsx',
      'Default',
      'base/Avatar'
    )
    .addExample('AvatarGroup/story/Limit.example.tsx', 'Limit', 'base/Avatar')
    .addExample('AvatarGroup/story/Sizes.example.tsx', 'Sizes', 'base/Avatar')
)

const componentDocs = { component: AvatarGroup, name: 'Avatar.Group' }

export default {
  chapter,
  componentDocs,
}
