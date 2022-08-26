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
    description: 'Simulates file upload and editing',
    takeScreenshot: false,
  })
