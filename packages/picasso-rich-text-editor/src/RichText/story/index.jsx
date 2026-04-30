import { RichText } from '../RichText'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'RichText',
  `
    RichText showcases the output of RichTextEditor.

    By default we should provide AST format as value from BE
    to prevent unnecessary parsing on FE side. In some cases
    we need to showcase preview before sending data to BE.
    For this case we provide util function \`htmlToHast\`.
    Please use carefully!

    ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: RichText, name: 'RichText' })

page
  .createChapter()
  .addExample('RichText/story/Default.example.tsx', {
    title: 'AST from BE for normal view',
    takeScreenshot: false,
  })
  .addExample('RichText/story/LongString.example.tsx', {
    title: 'Handle long string line breaks',
    delay: true,
  })
  .addExample('RichText/story/HTML.example.tsx', {
    title: 'HTML from FE for live-editing preview',
    delay: true,
  })
