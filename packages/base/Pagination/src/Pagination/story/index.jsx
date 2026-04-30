import { Pagination } from '../Pagination'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Pagination',
  `
    Component which allows navigating long data lists.

    ${PicassoBook.createSourceLink(__filename)}
  `
)

page.createTabChapter('Props').addComponentDocs({
  component: Pagination,
  additionalDocs: {
    onPageChange: {
      type: {
        name: 'function',
        description: '(page: number) => void',
      },
    },
  },
  name: 'Pagination',
})

page
  .createChapter()
  .addExample(
    'Pagination/story/Default.example.tsx',
    'Default',
    'base/Pagination'
  )
  .addExample(
    'Pagination/story/Disabled.example.tsx',
    'Disabled',
    'base/Pagination'
  )
  .addExample(
    'Pagination/story/Variants.example.tsx',
    'Variants',
    'base/Pagination'
  )
  .addExample(
    'Pagination/story/Ellipsis.example.tsx',
    'Ellipsis',
    'base/Pagination'
  )
