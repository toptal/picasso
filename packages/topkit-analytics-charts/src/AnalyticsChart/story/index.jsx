import AnalyticsChart from '../AnalyticsChart'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Charts').createPage(
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
  .addExample('AnalyticsChart/story/Multiple.example.tsx', 'Multiple')
  .addExample('AnalyticsChart/story/NullValues.example.tsx', {
    title: 'Null values',
    description:
      'You can provide `null` values as part of chart dataset. Those values will be indicated by "empty" dots on the chart. Additionally this information will be passed to custom tooltip component in case you will need it there.'
  })
  .addExample('AnalyticsChart/story/Highlights.example.tsx', 'Highlights')
  .addExample(
    'AnalyticsChart/story/ReferenceLines.example.tsx',
    'Reference Lines'
  )
  .addExample(
    'AnalyticsChart/story/FormatLabel.example.tsx',
    'Custom Format xAxis Label'
  )
  .addExample('AnalyticsChart/story/Granularity.example.tsx', 'Granularity')
