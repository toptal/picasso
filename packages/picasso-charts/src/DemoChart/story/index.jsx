import DemoChart from '../DemoChart'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Charts').createPage(
  'DemoChart',
  'This is what we can do with charts for now'
)

page.createTabChapter('Props').addComponentDocs({
  component: DemoChart,
  name: 'DemoChart'
})

page
  .createChapter()
  .addExample('DemoChart/story/Default.example.tsx', 'Default demo chart')
