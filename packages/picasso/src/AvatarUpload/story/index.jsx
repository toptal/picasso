import PicassoBook from '~/.storybook/components/PicassoBook'
import { AvatarUpload } from '../AvatarUpload'

const page = PicassoBook.section('Components').createPage(
  'AvatarUpload',
  `Gets the image from file input and displays it in the Avatar component.`
)

page.createTabChapter('Props').addComponentDocs({
  component: AvatarUpload,
  name: 'AvatarUpload',
})

page
  .createChapter()
  .addExample('AvatarUpload/story/Default.example.tsx', 'Default')
  .addExample('AvatarUpload/story/WithUpload.example.tsx', {
    title: 'With upload',
    description:
      'Shows how the component can be used with FileReader to upload a file',
    takeScreenshot: false,
  })
  .addExample('AvatarUpload/story/Sizes.example.tsx', 'Sizes')
  .addExample('AvatarUpload/story/States.example.tsx', 'States')
