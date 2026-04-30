import { Quote } from '../Quote'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Quote',
  `
    Use quotes to highlight quoted content.

    ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Quote, name: 'Quote' })

page
  .createChapter()
  .addExample('Quote/story/Default.example.tsx', 'Default', 'base/Quote')
