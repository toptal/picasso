import PicassoBook from '~/.storybook/components/PicassoBook'
import { Carousel } from '../Carousel'

const page = PicassoBook.section('Components').createPage('Carousel')

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Carousel, name: 'Carousel' })

page.createChapter().addExample('Carousel/story/Default.example.jsx', 'Default')
page
  .createChapter()
  .addExample('Carousel/story/SlidesToShow.example.jsx', 'Slides to show')
page
  .createChapter()
  .addExample('Carousel/story/Navigation.example.jsx', 'Navigation')
page
  .createChapter()
  .addExample(
    'Carousel/story/WithHeaderFooter.example.jsx',
    'Header and Footer'
  )
page.createChapter().addExample('Carousel/story/Events.example.jsx', 'Events')
page
  .createChapter()
  .addExample('Carousel/story/Responsive.example.jsx', 'Responsive')
