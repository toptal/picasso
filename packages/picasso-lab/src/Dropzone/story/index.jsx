import { Dropzone } from '../Dropzone'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Lab').createPage(
  'Dropzone',
  `
  ${PicassoBook.createBaseDocsLink(
    'https://app.abstract.com/projects/1b06c884-06af-482a-bf12-a82f521a19a1/branches/master/commits/58ee1df911f7d6ca2d9214171088a69bdff23401/files/13531207-e094-44ec-ae1f-f27628c1aea5/layers/27C9F1FA-E469-4AA4-936C-DD752F77ADE3?mode=build&selected=root-8BD3C500-A858-4CC4-8CE8-02E0453C0C4D&sha=58ee1df911f7d6ca2d9214171088a69bdff23401'
  )}
  `
)

page.createTabChapter('Props').addComponentDocs({
  component: Dropzone,
  name: 'Dropzone',
  additionalDocs: {
    accept: {
      name: 'accept',
      type: 'string | string[]',
      description:
        'Set accepted file types. See https://github.com/okonet/attr-accept for more information. Keep in mind that mime type determination is not reliable across platforms. CSV files, for example, are reported as text/plain under macOS but as application/vnd.ms-excel under Windows. In some cases there might not be a mime type set at all. See: https://github.com/react-dropzone/react-dropzone/issues/276'
    },
    onDropAccepted: {
      name: 'onDropAccepted',
      type: {
        name: 'function',
        description: '(files: File[], event) => void'
      },
      description:
        'Callback for when the drop event occurs. Note that if no files are accepted, this callback is not invoked.'
    },
    onDropRejected: {
      name: 'onDropRejected',
      type: {
        name: 'function',
        description: '(fileRejections: FileRejection[], event) => void'
      },
      description:
        'Callback for when the drop event occurs. Note that if no files are rejected, this callback is not invoked.'
    },
    validator: {
      name: 'validator',
      type: {
        name: 'function',
        description: '(file:File) => FileError | FileError[] | null'
      },
      description: 'Custom validation function',
      defaultvalue: 'null'
    },
    onDrop: {
      name: 'onDrop',
      type: {
        name: 'function',
        description:
          '(acceptedFiles: File[], fileRejections: FileRejection[], event:DragEvent | Event) => void'
      },
      description: `
Callback for when the drop event occurs. Note that this callback is invoked after the getFilesFromEvent callback is done.

Files are accepted or rejected based on the accept, multiple, minSize and maxSize props. accept must be a valid MIME type according to input element specification or a valid file extension. If multiple is set to false and additional files are dropped, all files besides the first will be rejected. Any file which does not have a size in the minSize, maxSize range, will be rejected as well.

Note that the onDrop callback will always be invoked regardless if the dropped files were accepted or rejected. If you'd like to react to a specific scenario, use the onDropAccepted/onDropRejected props.

onDrop will provide you with an array of File objects which you can then process and send to a server. For example, with SuperAgent as a http/ajax library:

      function onDrop(acceptedFiles) {
        const req = request.post('/upload')
        acceptedFiles.forEach(file => {
          req.attach(file.name, file)
        })
        req.end(callback)
      }
      `
    }
  }
})

page
  .createChapter()
  .addExample('Dropzone/story/Default.example.tsx', 'Default') // picasso-skip-visuals
  .addExample('Dropzone/story/Uploader.example.tsx', 'With upload') // picasso-skip-visuals
  .addExample('Dropzone/story/Uploading.example.tsx', 'Uploading') // picasso-skip-visuals
  .addExample('Dropzone/story/Disabled.example.tsx', 'Completed') // picasso-skip-visuals
  .addExample('Dropzone/story/Multiple.example.tsx', 'Completed Multiple files') // picasso-skip-visuals
  .addExample('Dropzone/story/Error.example.tsx', 'Upload Failed') // picasso-skip-visuals
