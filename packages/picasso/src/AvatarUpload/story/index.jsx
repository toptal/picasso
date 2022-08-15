import PicassoBook from '~/.storybook/components/PicassoBook'
import { AvatarUpload } from '../AvatarUpload'

const page = PicassoBook.section('Components').createPage(
  'AvatarUpload',
  'Gets the image from file input and displays it in the Avatar component.'
)

page.createTabChapter('Props').addComponentDocs({
  component: AvatarUpload,
  name: 'AvatarUpload',
  additionalDocs: {
    onDropAccepted: {
      name: 'onDropAccepted',
      type: {
        name: 'function',
        description: '(files: File, event) => void',
      },
      description:
        'Callback for when the drop event occurs. Note that if no files are accepted, this callback is not invoked.',
    },
    onDropRejected: {
      name: 'onDropRejected',
      type: {
        name: 'function',
        description: '(fileRejections: FileRejection, event) => void',
      },
      description:
        'Callback for when the drop event occurs. Note that if no files are rejected, this callback is not invoked.',
    },
    validator: {
      name: 'validator',
      type: {
        name: 'function',
        description: '(file:File) => FileError | FileError[] | null',
      },
      description: 'Custom validation function',
      defaultvalue: 'null',
    },
    onDrop: {
      name: 'onDrop',
      type: {
        name: 'function',
        description:
          '(acceptedFiles: File, fileRejections: FileRejection, event:DragEvent | Event) => void',
      },
      description: `
Callback for when the drop event occurs. Note that this callback is invoked after the getFilesFromEvent callback is done.

Files are accepted or rejected based on the accept, multiple, minSize and maxSize props. accept must be a valid MIME type according to input element specification or a valid file extension. If multiple is set to false and additional files are dropped, all files besides the first will be rejected. Any file which does not have a size in the minSize, maxSize range, will be rejected as well.

Note that the onDrop callback will always be invoked regardless if the dropped files were accepted or rejected. If you'd like to react to a specific scenario, use the onDropAccepted/onDropRejected props.

onDrop will provide you with an array of File objects which you can then process and send to a server. For example, with SuperAgent as a http/ajax library:

      function onDrop(acceptedFile) {
        const req = request.post('/upload')

        req.attach(acceptedFile.name, acceptedFile)
        req.end(callback)
      }
      `,
    },
  },
})

page
  .createChapter()
  .addExample('AvatarUpload/story/Default.example.tsx', {
    title: 'Default',
    takeScreenshot: false,
  })
  .addExample('AvatarUpload/story/Sizes.example.tsx', 'Sizes')
  .addExample('AvatarUpload/story/Warning.example.tsx', {
    title: 'Warning',
    description: 'Hover warning icon to see the message',
  })
  .addExample('AvatarUpload/story/Error.example.tsx', {
    title: 'Error',
    description: 'Error state when the field is required and empty',
  })
