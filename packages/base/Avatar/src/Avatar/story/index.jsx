import { Avatar } from '../Avatar'
import PicassoBook from '~/.storybook/components/PicassoBook'
import AvatarGroupStory from '../../AvatarGroup/story'

const page = PicassoBook.section('Components').createPage(
  'Avatar',
  `
    Profile photo.

    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/24f865c1-777a-4b7e-9c5b-cfe0d499f952?collectionLayerId=c74010be-d61e-40c8-be12-295ff4fef529&mode=design&present=true'
    )}

    ${PicassoBook.createSourceLink(__filename)}

    Additional notes:
      * The shape of clipped corner has a fallback for <=IE11, Edge to just a rectangle
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Avatar, name: 'Avatar' })
  .addComponentDocs(AvatarGroupStory.componentDocs)

page
  .createChapter()
  .addExample('Avatar/story/Default.example.tsx', 'Default')
  .addExample('Avatar/story/Variants.example.tsx', 'Variants')
  .addExample('Avatar/story/Sizes.example.tsx', 'Sizes')
  .addExample('Avatar/story/LongName.example.tsx', 'Long Name')
  .addExample('Avatar/story/Editable.example.tsx', 'Editable state')

page.connect(AvatarGroupStory.chapter)