import AnalyticsChart from '../AnalyticsChart'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Charts').createPage(
  'AnalyticsChart',
  'This is what we can do with charts for now'
)

page.createTabChapter('Props').addComponentDocs({
  component: AnalyticsChart,
  name: 'AnalyticsChart'
})

page
  .createChapter()
  .addExample('AnalyticsChart/story/Default.example.tsx', 'Default')
