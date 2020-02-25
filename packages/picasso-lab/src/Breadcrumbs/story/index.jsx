import Breadcrumbs from '../Breadcrumbs'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage(
  'Breadcrumbs',
  'Breadcrumbs component indicates the current page’s location within a navigational hierarchy.'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Breadcrumbs, name: 'Breadcrumbs' })

page
  .createChapter()
  .addExample('Breadcrumbs/story/Default.example.tsx', 'Default')
