import { Amount } from '../Amount'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Amount',
  'Use `Amount` to render formatted amount with a currency'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Amount, name: 'Amount' })

page
  .createChapter()
  .addExample('Amount/story/Default.example.jsx', 'Default')
  .addExample('Amount/story/Currency.example.jsx', 'EUR Currency example')
