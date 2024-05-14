import { Fade } from '../Fade'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Transitions').createPage('Fade')

page.createTabChapter('Props').addComponentDocs({
  component: Fade,
  name: 'Fade',
})

page.createChapter().addExample(
  'Fade/story/Default.example.tsx',
  {
    title: 'Default',
    takeScreenshot: false,
  },
  'base/Fade'
)
