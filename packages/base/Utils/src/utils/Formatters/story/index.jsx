import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Utils').createPage(
  'Formatters',
  `
      For consistent user experience, we need to standardize formatters.
  `
)

page
  .createChapter()
  .addExample('utils/Formatters/story/amount.example.tsx', 'Amount Formatter')
