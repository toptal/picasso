import PicassoBook from '~/.storybook/components/PicassoBook'
import TextEditor from '../TextEditor'

const page = PicassoBook.section('Picasso Lab').createPage(
  'TextEditor',
  `
  ${PicassoBook.createBaseDocsLink(
    'https://share.goabstract.com/e4c79c6c-4bcd-4411-97b7-09e821925e8e?mode=build&sha=e93949b90e728478fecb60bd7ba1efc06803315b'
  )}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: TextEditor, name: 'TextEditor' })

page
  .createChapter()
  .addExample('TextEditor/story/Default.example.tsx', 'Default') // picasso-skip-visuals
  .addExample('TextEditor/story/DefaultValue.example.tsx', 'Default Value') // picasso-skip-visuals
  .addExample('TextEditor/story/Disabled.example.tsx', 'Disabled') // picasso-skip-visuals
// .addExample('TextEditor/story/Readonly.example.tsx', 'Readonly') // picasso-skip-visuals
// .addExample('TextEditor/story/Limit.example.tsx', 'Limit Length') // picasso-skip-visuals
