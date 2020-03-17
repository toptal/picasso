import { Ellipsis } from '../Ellipsis'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage(
  'Ellipsis',
  'Enhance ellipses'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Ellipsis, name: 'Ellipsis' })

page.createChapter().addExample('Ellipsis/story/Default.example.jsx', {
  title: 'Default',
  waitUntilImagesLoaded: true
})
