import PicassoBook from '../../../.storybook/components/PicasoBook'

const page = PicassoBook.createPage(
  'Spacer',
  'Use Spacer to add space between 2 elements.'
)

page
  .addExample('Spacer/story/Default-example.jsx', 'Default')
  .addExample('Spacer/story/Inline-example.jsx', 'Inline')
