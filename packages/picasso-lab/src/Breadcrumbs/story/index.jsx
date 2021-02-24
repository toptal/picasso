import Breadcrumbs from '../Breadcrumbs'
import breadcrumbsItemStory from '../../BreadcrumbsItem/story'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Lab').createPage(
  'Breadcrumbs',
  `
    Breadcrumbs component indicates the current page’s location within a navigational hierarchy.
    
    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/1b756105-df33-4f15-893e-991c708118ca?collectionLayerId=49e2d82a-9a4b-42b8-8a76-6746780f599c&mode=design&present=true'
    )}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Breadcrumbs, name: 'Breadcrumbs' })
  .addComponentDocs(breadcrumbsItemStory.componentDocs)

page
  .createChapter()
  .addExample('Breadcrumbs/story/Default.example.tsx', 'Default')
  .addExample('Breadcrumbs/story/SimpleLinks.example.tsx', 'Simple links')
