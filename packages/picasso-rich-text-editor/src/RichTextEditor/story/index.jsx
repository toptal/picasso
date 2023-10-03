import PicassoBook from '~/.storybook/components/PicassoBook'
import RichTextEditor from '../RichTextEditor'

const page = PicassoBook.section('Forms').createPage(
  'RichTextEditor',
  `
  ${PicassoBook.createBaseDocsLink(
    'https://share.goabstract.com/e4c79c6c-4bcd-4411-97b7-09e821925e8e?mode=build&sha=e93949b90e728478fecb60bd7ba1efc06803315b'
  )}

  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: RichTextEditor, name: 'RichTextEditor' })

page
  .createChapter()
  .addExample('RichTextEditor/story/Default.example.tsx', 'Default')
// .addExample('RichTextEditor/story/DefaultValue.example.tsx', {
//   title: 'Default value',
//   takeScreenshot: false,
// })
// .addExample('RichTextEditor/story/Disabled.example.tsx', 'Disabled')
// .addExample('RichTextEditor/story/Limit.example.tsx', {
//   title: 'Limit Length',
//   takeScreenshot: false,
// })
// .addExample('RichTextEditor/story/Status.example.tsx', 'Status')
// .addExample('RichTextEditor/story/Links.example.tsx', {
//   title: 'Links',
//   takeScreenshot: false,
// })
// .addExample('RichTextEditor/story/Emoji.example.tsx', {
//   title: 'Emojis',
//   takeScreenshot: false,
// })
// .addExample('RichTextEditor/story/ImageUpload.example.tsx', 'Image upload')
// .addExample('RichTextEditor/story/Code.example.tsx', 'Code')
