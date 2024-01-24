import { EmptyStateCollection } from '../EmptyStateCollection'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  EmptyStateCollection,
  'EmptyState.Collection'
)

const chapter = PicassoBook.connectToPage(page =>
  page.createChapter('EmptyState.Collection').addExample(
    'EmptyStateCollection/story/Default.example.tsx',
    {
      id: 'EmptyStateCollection',
    },
    'base/EmptyState'
  )
)

export default {
  componentDocs,
  chapter,
}
