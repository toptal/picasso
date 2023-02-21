import PicassoBook from '~/.storybook/components/PicassoBook'
import { Carousel } from '../Carousel'

const page = PicassoBook.section('Components').createPage('Carousel')

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Carousel, name: 'Carousel' })

page.createChapter().addExample('Carousel/story/Default.example.jsx', {
  title: 'Default',
  takeScreenshot: false,
})
page.createChapter().addExample('Carousel/story/SlidesToShow.example.jsx', {
  title: 'Slides to show',
  description:
    'When not a whole number is used (2.5), it shows gradient over the last item by default',
  takeScreenshot: false,
})
page.createChapter().addExample('Carousel/story/Navigation.example.jsx', {
  takeScreenshot: false,
  title: 'Navigation',
})

page.createChapter().addExample('Carousel/story/Events.example.jsx', {
  title: 'Events',
  takeScreenshot: false,
})
page.createChapter().addExample('Carousel/story/Autoplay.example.jsx', {
  title: 'Autoplay',
  description:
    'Autoplay will start only after the carousel is visible on the screen',
  takeScreenshot: false,
})
page.createChapter().addExample('Carousel/story/Rewind.example.jsx', {
  title: 'Rewind',
  takeScreenshot: false,
})
