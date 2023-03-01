import PicassoBook from '~/.storybook/components/PicassoBook'
import { Carousel } from '../Carousel'

const page = PicassoBook.section('Components').createPage('Carousel')

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Carousel, name: 'Carousel' })

page.createChapter().addExample('Carousel/story/Default.example.tsx', {
  title: 'Default',
  takeScreenshot: false,
})
page.createChapter().addExample('Carousel/story/SlidesToShow.example.tsx', {
  title: 'Slides to show',
  description:
    'When not a whole number is used (2.5), it shows gradient over the last item by default',
  takeScreenshot: false,
})
page.createChapter().addExample('Carousel/story/Navigation.example.tsx', {
  takeScreenshot: false,
  title: 'Navigation',
})

page.createChapter().addExample('Carousel/story/Events.example.tsx', {
  title: 'Events',
  takeScreenshot: false,
})
page.createChapter().addExample('Carousel/story/Autoplay.example.tsx', {
  title: 'Autoplay',
  description:
    'Autoplay will start only after the carousel is visible on the screen',
  takeScreenshot: false,
})
page.createChapter().addExample('Carousel/story/Rewind.example.tsx', {
  title: 'Rewind',
  takeScreenshot: false,
})
