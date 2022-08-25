import PicassoBook from '~/.storybook/components/PicassoBook'
import { AvatarUpload } from '../AvatarUpload'

const page = PicassoBook.section('Components').createPage(
  'AvatarUpload',
  `Gets the image from file input and displays it in the Avatar component.
  
  AvatarUpload works as follows:
  - When the user selects or drops an image from the file input, 'Dropzone' will trigger 'onDrop' event.
  - The event handler will call the 'onDrop' handler passed to the component.
  - After this point, user should start uploading the image externally and pass 'uploading' state to the component.
  - When the image upload is done, image source URL should be passed to the component.
  - The component will display the new avatar image. 
  `
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
  .addExample(
    'AvatarUpload/story/WithHeaderAndDescription.example.tsx',
    'With header and file description'
  )
  .addExample('AvatarUpload/story/WithUpload.example.tsx', {
    title: 'With Upload',
    takeScreenshot: false,
    description: 'Simulates upload of an image on drop',
  })
  .addExample('AvatarUpload/story/Sizes.example.tsx', 'Sizes')
  .addExample('AvatarUpload/story/States.example.tsx', 'States')
