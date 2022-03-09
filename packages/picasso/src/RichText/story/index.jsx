import { RichText } from '../RichText'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'RichText',
  `
    RichText showcases the output of RichTextEditor.

    By default we should provide AST format as value from BE
    to prevent unnecessary parsing on FE side. In some cases
    we need to showcase preview before sending data to BE.
    For this case we can provide directly HTML output from
    RichTextEditor. Please use carefully!

    ${PicassoBook.createBaseDocsLink(
      'https://app.abstract.com/projects/1b06c884-06af-482a-bf12-a82f521a19a1/branches/master/commits/4f1f6493dfac89015cc6c71ea348807e931fe3bc/files/13531207-e094-44ec-ae1f-f27628c1aea5/layers/5AFC1310-BBF4-4601-BA95-9FB38248733B?mode=design'
    )}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: RichText, name: 'RichText' })

page
  .createChapter()
  .addExample('RichText/story/Default.example.tsx', 'Default') // picasso-skip-visuals
  .addExample('RichText/story/HTML.example.tsx', 'With HTML value') // picasso-skip-visuals
