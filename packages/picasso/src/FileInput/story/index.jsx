import { FileInput } from '../FileInput'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'FileInput',
  'Input file control'
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
      defaultValue: 1
    }
  }
})

page
  .createChapter()
  .addExample('FileInput/story/Default.example.tsx', 'Default')
  .addExample('FileInput/story/InitialValue.example.tsx', 'Initial value')
  .addExample(
    'FileInput/story/LimitedFileCount.example.tsx',
    'Limited file count'
  )
  .addExample('FileInput/story/Error.example.tsx', 'Error')
  .addExample('FileInput/story/Disabled.example.tsx', 'Disabled')
  .addExample('FileInput/story/Uploading.example.tsx', 'Uploading')
  .addExample(
    'FileInput/story/AllowedExtensions.example.tsx',
    'Allowed Extensions'
  )
  .addExample('FileInput/story/Uploader.example.tsx', {
    title: 'With Uploader',
    description:
      'Showcase how to integrate FileInput with uploading logic. Randomly returns errors and allows only upload of image files'
  })
  .addExample('FileInput/story/FileList.example.tsx', {
    title: 'FileList',
    description: 'List of files'
  }) // picasso-skip-visuals
