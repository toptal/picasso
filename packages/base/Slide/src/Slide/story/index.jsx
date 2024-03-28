import { Slide } from '../Slide'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage('Slide')

page.createTabChapter('Props').addComponentDocs({
  component: Slide,
  name: 'Slide',
})

page.createChapter().addExample(
  'Slide/story/Default.example.tsx',
  {
    title: 'Default',
    takeScreenshot: false,
  },
  'base/Slide'
)
