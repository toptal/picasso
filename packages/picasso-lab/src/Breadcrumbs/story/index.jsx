import Breadcrumbs from '../Breadcrumbs'
import breadcrumbsItemStory from '../../BreadcrumbsItem/story'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Lab').createPage(
  'Breadcrumbs',
  'Breadcrumbs component indicates the current page’s location within a navigational hierarchy.'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Breadcrumbs, name: 'Breadcrumbs' })
  .addComponentDocs(breadcrumbsItemStory.componentDocs)

page
  .createChapter()
  .addExample('Breadcrumbs/story/Default.example.tsx', 'Default')
  .addExample('Breadcrumbs/story/SimpleLinks.example.tsx', 'Simple links')
