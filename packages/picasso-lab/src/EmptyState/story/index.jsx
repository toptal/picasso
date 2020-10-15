import PicassoBook from '~/.storybook/components/PicassoBook'
import { EmptyStateCollection } from '../../EmptyStateCollection/EmptyStateCollection'
import { EmptyStatePage } from '../../EmptyStatePage/EmptyStatePage'

const page = PicassoBook.section('Lab').createPage('EmptyState')

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: EmptyStatePage,
    name: 'EmptyState.Page'
  })
  .addComponentDocs({
    component: EmptyStateCollection,
    name: 'EmptyState.Collection'
  })

page
  .createChapter()
  .addExample('EmptyStatePage/story/Page.example.tsx', 'EmptyState.Page')
  .addExample(
    'EmptyStateCollection/story/Collection.example.tsx',
    'EmptyState.Collection'
  )
