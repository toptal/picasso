import { Dropzone } from '../Dropzone'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
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
    disabled: {
      name: 'disabled',
      type: 'boolean',
      description: 'Enable/disable the dropzone',
      defaultValue: 'false'
    },
    getFilesFromEvent: {
      name: 'getFilesFromEvent',
      type: 'function',
      description: 'Use this to provide a custom file aggregator'
    },
    maxFiles: {
      name: 'maxFiles',
      type: 'number',
      description:
        'Maximum accepted number of files The default value is 0 which means there is no limitation to how many files are accepted.',
      defaultValue: 0
    },
    maxSize: {
      name: 'maxSize',
      type: 'number',
      description: 'Maximum file size (in bytes)',
      defaultValue: 'Infinity'
    },
    minSize: {
      name: 'minSize',
      type: 'number',
      description: 'Minimum file size (in bytes)',
      defaultValue: 0
    },
    multiple: {
      name: 'multiple',
      type: 'boolean',
      description:
        "Allow drag 'n' drop (or selection from the file dialog) of multiple files",
      defaultValue: 'true'
    },
    noClick: {
      name: 'noClick',
      type: 'boolean',
      description:
        'If true, disables click to open the native file selection dialog',
      defaultValue: 'false'
    },
    noDrag: {
      name: 'noDrag',
      type: 'boolean',
      description: "If true, disables drag 'n' drop",
      defaultValue: 'false'
    },
    noDragEventsBubbling: {
      name: 'noDragEventsBubbling',
      type: 'boolean',
      description: 'If true, stops drag event propagation to parents',
      defaultValue: 'false'
    },
    noKeyboard: {
      name: 'noKeyboard',
      type: 'boolean',
      description:
        'If true, disables SPACE/ENTER to open the native file selection dialog. Note that it also stops tracking the focus state.',
      defaultValue: 'false'
    },
    onDragEnter: {
      name: 'onDragEnter',
      type: '(event:DragEvent) => void',
      description: 'Cb for when the dragenter event occurs.'
    },
    onDragLeave: {
      name: 'onDragLeave',
      type: '(event:DragEvent) => void',
      description: 'Cb for when the dragleave event occurs'
    },
    onDragOver: {
      name: 'onDragOver',
      type: {
        name: 'function',
        description: '(event:DragEvent) => void'
      },
      description: 'Cb for when the dragover event occurs'
    },
    onDropAccepted: {
      name: 'onDropAccepted',
      type: {
        name: 'function',
        description: '(files: File[], event) => void'
      },
      description:
        'Cb for when the drop event occurs. Note that if no files are accepted, this callback is not invoked.'
    },
    onDropRejected: {
      name: 'onDropRejected',
      type: {
        name: 'function',
        description: '(fileRejections: FileRejection[], event) => void'
      },
      description:
        'Cb for when the drop event occurs. Note that if no files are rejected, this callback is not invoked.'
    },
    onFileDialogCancel: {
      name: 'onFileDialogCancel',
      type: 'function',
      description: 'Cb for when closing the file dialog with no selection'
    },
    preventDropOnDocument: {
      name: 'preventDropOnDocument',
      type: 'boolean',
      description:
        'If false, allow dropped items to take over the current browser window',
      defaultvalue: 'true'
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
Cb for when the drop event occurs. Note that this callback is invoked after the getFilesFromEvent callback is done.

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
  .addExample('Dropzone/story/Hover.example.tsx', 'Hover') // picasso-skip-visuals
  .addExample('Dropzone/story/Uploading.example.tsx', 'Uploading') // picasso-skip-visuals
  .addExample('Dropzone/story/Completed.example.tsx', 'Completed') // picasso-skip-visuals
  .addExample('Dropzone/story/Multiple.example.tsx', 'Completed Multiple files') // picasso-skip-visuals
  .addExample('Dropzone/story/Error.example.tsx', 'Upload Failed') // picasso-skip-visuals
