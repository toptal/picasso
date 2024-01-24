import { Amount } from '../Amount'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Amount',
  `
    Use "Amount" to render formatted amount with a currency, in desired locale.

    ${PicassoBook.createSourceLink(__filename)}
  `
)

page.createTabChapter('Props').addComponentDocs({
  component: Amount,
  name: 'Amount',
})

page
  .createChapter()
  .addExample('Amount/story/Default.example.tsx', 'Default', 'base/Amount')
  .addExample(
    'Amount/story/Currency.example.tsx',
    'Currency Variants',
    'base/Amount'
  )
  .addExample(
    'Amount/story/Variants.example.tsx',
    'Typography Variants',
    'base/Amount'
  )
  .addExample(
    'Amount/story/Locale.example.tsx',
    'Locale Variants',
    'base/Amount'
  )
  .addExample(
    'Amount/story/Decimals.example.tsx',
    'Fractional digits',
    'base/Amount'
  )
