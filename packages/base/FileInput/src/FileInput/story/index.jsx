import { FileInput } from '../FileInput'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'FileInput',
  `Input file control
  
  ${PicassoBook.createSourceLink(__filename)}
  `
)

page.createTabChapter('Props').addComponentDocs({
  component: FileInput,
  name: 'FileInput',
  additionalDocs: {
    maxFiles: {
      name: 'maxFiles',
      type: 'number | null',
      description:
        'Maximum number of files allowed. When the value is null, unlimited files can be added and multiple files can be selected on the file selection dialog',
      defaultValue: 1,
    },
  },
})

page
  .createChapter()
  .addExample(
    'FileInput/story/Default.example.tsx',
    'Default',
    'base/FileInput'
  )
  .addExample(
    'FileInput/story/CustomButtonLabel.example.tsx',
    'Custom label',
    'base/FileInput'
  )
  .addExample(
    'FileInput/story/InitialValue.example.tsx',
    'Initial value',
    'base/FileInput'
  )
  .addExample(
    'FileInput/story/LimitedFileCount.example.tsx',
    'Limited file count',
    'base/FileInput'
  )
  .addExample('FileInput/story/Error.example.tsx', 'Error', 'base/FileInput')
  .addExample(
    'FileInput/story/Disabled.example.tsx',
    'Disabled',
    'base/FileInput'
  )
  .addExample(
    'FileInput/story/Uploading.example.tsx',
    'Uploading',
    'base/FileInput'
  )
  .addExample(
    'FileInput/story/AllowedExtensions.example.tsx',
    'Allowed Extensions',
    'base/FileInput'
  )
  .addExample(
    'FileInput/story/Uploader.example.tsx',
    {
      title: 'With Uploader',
      description:
        'Showcase how to integrate FileInput with uploading logic. Randomly returns errors and allows only upload of image files',
    },
    'base/FileInput'
  )
  .addExample(
    'FileInput/story/FileList.example.tsx',
    {
      title: 'FileList',
      description: 'List of files',
      takeScreenshot: false,
    },
    'base/FileInput'
  )
