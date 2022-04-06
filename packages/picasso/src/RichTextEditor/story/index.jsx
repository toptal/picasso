import PicassoBook from '~/.storybook/components/PicassoBook'
import RichTextEditor from '../RichTextEditor'

const page = PicassoBook.section('Components').createPage(
  'RichTextEditor',
  `
  ${PicassoBook.createBaseDocsLink(
    'https://share.goabstract.com/e4c79c6c-4bcd-4411-97b7-09e821925e8e?mode=build&sha=e93949b90e728478fecb60bd7ba1efc06803315b'
  )}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: RichTextEditor, name: 'RichTextEditor' })

page
  .createChapter()
  .addExample('RichTextEditor/story/Default.example.tsx', 'Default') // picasso-skip-visuals
  .addExample('RichTextEditor/story/DefaultValue.example.tsx', 'Default value') // picasso-skip-visuals
  .addExample('RichTextEditor/story/Disabled.example.tsx', 'Disabled') // picasso-skip-visuals
  .addExample('RichTextEditor/story/Limit.example.tsx', 'Limit Length') // picasso-skip-visuals
  .addExample('RichTextEditor/story/Status.example.tsx', 'Status') // picasso-skip-visuals
