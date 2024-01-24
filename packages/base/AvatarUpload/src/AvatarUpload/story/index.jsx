import PicassoBook from '~/.storybook/components/PicassoBook'
import { AvatarUpload } from '../AvatarUpload'

const page = PicassoBook.section('Forms').createPage(
  'AvatarUpload',
  `
    Gets the image from file input and displays it in the Avatar component.

    ${PicassoBook.createSourceLink(__filename)}
  `
)

page.createTabChapter('Props').addComponentDocs({
  component: AvatarUpload,
  name: 'AvatarUpload',
})

page
  .createChapter()
  .addExample(
    'AvatarUpload/story/Default.example.tsx',
    'Default',
    'base/AvatarUpload'
  )
  .addExample(
    'AvatarUpload/story/WithUpload.example.tsx',
    {
      title: 'With upload',
      description:
        'Shows how the component can be used with FileReader to upload a file',
      takeScreenshot: false,
    },
    'base/AvatarUpload'
  )
  .addExample(
    'AvatarUpload/story/Sizes.example.tsx',
    'Sizes',
    'base/AvatarUpload'
  )
  .addExample(
    'AvatarUpload/story/States.example.tsx',
    'States',
    'base/AvatarUpload'
  )
  .addExample(
    'AvatarUpload/story/UsingRef.example.tsx',
    {
      title: 'Using ref',
      description:
        'Shows how to use the ref to access the component after clicking edit',
      takeScreenshot: false,
    },
    'base/AvatarUpload'
  )
