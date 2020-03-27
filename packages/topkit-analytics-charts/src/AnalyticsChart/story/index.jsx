import AnalyticsChart from '../AnalyticsChart'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Charts').createPage(
  'AnalyticsChart',
  'Use LineChart with analytics data'
)

page.createTabChapter('Props').addComponentDocs({
  component: AnalyticsChart,
  name: 'AnalyticsChart'
  // additionalDocs: {
  //   data: {
  //     name: 'data',
  //     type: {
  //       name: '[]',
  //       description: '{ [key: string]: string | number }: HighlightData'
  //     },
  //     description: 'A list of data points to be rendered as a line chart',
  //     required: true
  //   },
  //   lines: {
  //     name: 'lines',
  //     type: {
  //       name: 'ChartLine',
  //       description: '{ [key: string]: string }'
  //     },
  //     description:
  //       'A dictionary of each line name as a key and color as a value',
  //     required: true
  //   },
  //   xAxisKey: {
  //     name: 'xAxisKey',
  //     type: 'string',
  //     description: 'X axis key name to be used in the data array',
  //     defaultValue: 'x'
  //   },
  //   yAxisKey: {
  //     name: 'yAxisKey',
  //     type: 'string',
  //     description: 'Y axis key name to be used in the data array',
  //     defaultValue: 'y'
  //   },
  //   highlightsData: {
  //     name: 'highlightsData',
  //     type: {
  //       name: '[]',
  //       description: `{
  //           from: number
  //           to: number
  //           color: string
  //         }: HighlightData`
  //     },
  //     description: 'A list of regions to be highlighted'
  //   },
  //   referenceLineData: {
  //     name: 'referenceLineData',
  //     type: {
  //       name: '[]',
  //       description: `{
  //         y: number
  //         color: string
  //       }: ReferenceLineType`
  //     },
  //     description:
  //       'Will display a full-width horizontal dashed line at the specified height in the specified color'
  //   }
  // }
})

page
  .createChapter()
  .addExample('AnalyticsChart/story/Default.example.tsx', 'Default')
