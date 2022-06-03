import AvatarGroup from '../AvatarGroup'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Avatar Group')
    .addExample('AvatarGroup/story/Default.example.tsx', {
      title: 'Default',
      takeScreenshot: false
    })
    .addExample('AvatarGroup/story/Limit.example.tsx', {
      title: 'Limit',
      takeScreenshot: false
    })
    .addExample('AvatarGroup/story/Sizes.example.tsx', {
      title: 'Sizes',
      takeScreenshot: false
    })
)

const componentDocs = { component: AvatarGroup, name: 'Avatar.Group' }

export default {
  chapter,
  componentDocs
}
