import { FileInput } from '../FileInput'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'FileInput',
  'Input file control'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: FileInput, name: 'FileInput' })

page
  .createChapter()
  .addExample('FileInput/story/Default.example.jsx', 'Default')
  .addExample('FileInput/story/Error.example.jsx', 'Error')
  .addExample('FileInput/story/Disabled.example.jsx', 'Disabled')
  .addExample('FileInput/story/Uploading.example.jsx', 'Uploading')
  .addExample(
    'FileInput/story/AllowedExtensions.example.jsx',
    'Allowed Extensions'
  )
  .addExample('FileInput/story/Uploader.example.jsx', {
    title: 'With Uploader',
    description:
      'Showcase how to integrate FileInput with uploading logic. Randomly returns errors and allows only upload of image files'
  })
