import { Pagination } from '../Pagination'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Pagination',
  `
    Component which allows navigating long data lists.
    
    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/e3bd043d-067c-45b1-9fd2-374b8fbf1d2e?collectionLayerId=090b6339-904f-4cd9-b77e-7aff15f93638&mode=design&present=true'
    )}

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
