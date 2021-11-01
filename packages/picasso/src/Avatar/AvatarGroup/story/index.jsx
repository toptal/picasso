import AvatarGroup from '../AvatarGroup'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(
  page =>
    page
      .createChapter('Avatar Group')
      .addExample('Avatar/AvatarGroup/story/Default.example.tsx', 'Default') // picasso-skip-visuals
      .addExample('Avatar/AvatarGroup/story/Limit.example.tsx', 'Limit') // picasso-skip-visuals
      .addExample('Avatar/AvatarGroup/story/Sizes.example.tsx', 'Sizes') // picasso-skip-visuals
      .addExample('Avatar/AvatarGroup/story/Variants.example.tsx', 'Variants') // picasso-skip-visuals
)

const componentDocs = { component: AvatarGroup, name: 'Avatar.Group' }

export default {
  chapter,
  componentDocs
}
