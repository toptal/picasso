import AnalyticsChart from '../AnalyticsChart'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Charts').createPage(
  'AnalyticsChart',
  'Use LineChart with analytics data'
)

page.createTabChapter('Props').addComponentDocs({
  component: AnalyticsChart,
  name: 'AnalyticsChart'
})

page
  .createChapter()
  .addExample('AnalyticsChart/story/Default.example.tsx', 'Default')
