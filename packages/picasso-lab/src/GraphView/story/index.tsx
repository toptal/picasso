import GraphView from '../GraphView'
// @ts-ignore
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage(
  'GraphView',
  'Allows rendering a graph view'
)

page.createTabChapter('Props').addComponentDocs({
  component: GraphView,
  name: 'GraphView'
})

page
  .createChapter()
  .addExample('GraphView/story/Default.example.tsx', 'Default')
