import PicassoBook from '~/.storybook/components/PicassoBook'
import emptyStatePageStory from '../../EmptyStatePage/story'
import emptyStateCollectionStory from '../../EmptyStateCollection/story'

const page = PicassoBook.section('Lab').createPage('EmptyState')

page
  .createTabChapter('Props')
  .addComponentDocs(emptyStatePageStory.componentDocs)
  .addComponentDocs(emptyStateCollectionStory.componentDocs)

page.connect(emptyStatePageStory.chapter)
page.connect(emptyStateCollectionStory.chapter)
