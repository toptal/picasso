import { Pagination } from '../Pagination'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Pagination',
  'Component which allows navigating long data lists.'
)

page.createTabChapter('Props').addComponentDocs({
  component: Pagination,
  additionalDocs: {
    onPageChange: {
      type: {
        name: 'function',
        description: '(pageNumber: number) => void'
      }
    }
  },
  name: 'Pagination'
})

page
  .createChapter()
  .addExample('Pagination/story/Default.example.tsx', 'Default')
  .addExample('Pagination/story/Variants.example.tsx', 'Variants')
  .addExample('Pagination/story/Disabled.example.tsx', 'Disabled')
