import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Pagination',
  'Component which allows navigating long data lists.'
)

const docs = [
  {
    name: 'activePage',
    type: 'number',
    description: 'Specify currently active page'
  },
  {
    name: 'totalPages',
    type: 'number',
    description: 'Specify amount of total pages'
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the pagination should be disabled'
  },
  {
    name: 'onPageChange',
    type: 'function',
    description: `
      Callback triggered when attempting to change the page.
      <br />
      <br />
      <b>Signature:</b>
      function(page: number) => void
      page: actual page number which user clicked 
    `
  }
]

page
  .addDocs(docs)
  .addExample('Pagination/story/Default.example.jsx', 'Default')
  .addExample('Pagination/story/Disabled.example.jsx', 'Disabled')
