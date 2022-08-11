import PicassoBook from '~/.storybook/components/PicassoBook'
import { AvatarUpload } from '../AvatarUpload'

const page = PicassoBook.section('Components').createPage(
  'AvatarUpload',
  'Gets the image from file input and displays it in the Avatar component.'
)

page.createTabChapter('Props').addComponentDocs({
  component: AvatarUpload,
  name: 'AvatarUpload',
})

page
  .createChapter()
  .addExample('AvatarUpload/story/Default.example.tsx', {
    title: 'Default',
    takeScreenshot: false,
  })
  .addExample('AvatarUpload/story/WithUpload.example.tsx', {
    title: 'With Upload',
    takeScreenshot: false,
    description: 'Simulates upload of an image on drop',
  })
  .addExample('AvatarUpload/story/Sizes.example.tsx', 'Sizes')
  .addExample('AvatarUpload/story/Warning.example.tsx', {
    title: 'Warning',
    description: 'Hover warning icon to see the message',
  })
  .addExample('AvatarUpload/story/States.example.tsx', 'States')
