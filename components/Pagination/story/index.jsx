import PicassoBook from '../../../.storybook/components/PicassoBook'
import { Pagination } from '../Pagination'

const page = PicassoBook.createPage(
  'Pagination',
  'Component which allows navigating long data lists.'
)

page
  .addComponentDocs(Pagination, {
    onPageChange: {
      type: {
        name: 'function',
        description: '(pageNumber: number) => void'
      }
    }
  })
  .addExample('Pagination/story/Default.example.jsx', 'Default')
  .addExample('Pagination/story/Disabled.example.jsx', 'Disabled')
