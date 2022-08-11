import PicassoBook from '~/.storybook/components/PicassoBook'
import { AvatarDropzone } from '../AvatarDropzone'

const page = PicassoBook.section('Components').createPage(
  'AvatarDropzone',
  'Gets the image from file input and displays it in the Avatar component.'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: AvatarDropzone, name: 'AvatarDropzone' })

page
  .createChapter()
  .addExample('AvatarDropzone/story/Default.example.tsx', {
    title: 'Default',
    takeScreenshot: false,
  })
  .addExample('AvatarDropzone/story/Sizes.example.tsx', 'Sizes')
  .addExample('AvatarDropzone/story/Warning.example.tsx', {
    title: 'Warning',
    description: 'Hover warning icon to see the message',
  })
  .addExample('AvatarDropzone/story/Error.example.tsx', {
    title: 'Error',
    description: 'Error state when the field is required and empty',
  })
