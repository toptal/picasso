import PicassoBook from '~/.storybook/components/PicassoBook'
// @ts-ignore
import emptyStatePageStory from '../../EmptyStatePage/story'
// @ts-ignore
import emptyStateCollectionStory from '../../EmptyStateCollection/story'

const page = PicassoBook.section('Lab').createPage('EmptyState')

page
  .createTabChapter('Props')
  .addComponentDocs(emptyStatePageStory.componentDocs)
  .addComponentDocs(emptyStateCollectionStory.componentDocs)

page.connect(emptyStatePageStory.chapter)
page.connect(emptyStateCollectionStory.chapter)
