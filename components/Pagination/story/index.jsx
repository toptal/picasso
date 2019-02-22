import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Pagination',
  'Component which allows navigating long data lists.'
)

page
  .addExample('Pagination/story/Default-example.jsx', 'Default')
  .addExample('Pagination/story/Disabled-example.jsx', 'Disabled')
