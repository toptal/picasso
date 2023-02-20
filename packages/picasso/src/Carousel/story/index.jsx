import PicassoBook from '~/.storybook/components/PicassoBook'
import { Carousel } from '../Carousel'

const page = PicassoBook.section('Components').createPage(
  'Carousel',
  `<-- description -->`
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Carousel, name: 'Carousel' })

page.createChapter().addExample('Carousel/story/Default.example.jsx', 'Default')
