import AvatarGroup from '../AvatarGroup'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Avatar Group')
    .addExample('AvatarGroup/story/Default.example.tsx', 'Default')
    .addExample('AvatarGroup/story/Limit.example.tsx', 'Limit')
    .addExample('AvatarGroup/story/Sizes.example.tsx', 'Sizes')
)

const componentDocs = { component: AvatarGroup, name: 'Avatar.Group' }

export default {
  chapter,
  componentDocs,
}
