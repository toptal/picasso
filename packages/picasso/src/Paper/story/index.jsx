import { Paper } from '../Paper'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Layout').createPage(
  'Paper',
  'Elevated container with shadow'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Paper, name: 'Paper' })

page.createChapter().addExample('Paper/story/Default.example.tsx', 'Default')
