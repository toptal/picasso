import { palette } from '@toptal/picasso/utils'

import AnalyticsChart from '../AnalyticsChart'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Charts').createPage(
  'AnalyticsChart',
  'Use LineChart with analytics data'
)

page.createTabChapter('Props').addComponentDocs({
  component: AnalyticsChart,
  name: 'AnalyticsChart',
  additionalDocs: {
    data: {
      name: 'data',
      type: {
        name: '{}',
        description: '{ [key: string]: number }'
      },
      description: 'A record of data points to be rendered as a line chart',
      required: true
    },
    lineColor: {
      name: 'lineColor',
      type: 'string',
      description: 'Color of the line chart',
      defaultValue: palette.blue.main
    },
    highlightsData: {
      name: 'highlightsData',
      type: 'string[]',
      description: 'A list of dates to be highlighted'
    },
    highLightsColor: {
      name: 'highLightsColor',
      type: 'string',
      description: 'Color of the highlighted area',
      defaultValue: palette.red.main
    },
    referenceLineData: {
      name: 'referenceLineData',
      type: {
        name: 'string[]',
        description: `{
          y: number
          color: string
        }: ReferenceLineType`
      },
      description:
        'A record of data points to be rendered as a dashed horizontal reference line'
    },
    referenceLineColor: {
      name: 'referenceLineColor',
      type: 'string',
      description: 'Color of the reference line',
      defaultValue: palette.red.main
    },
    xAxisKey: {
      name: 'xAxisKey',
      type: 'string',
      description: 'X axis key name to be used in the data array',
      defaultValue: 'x'
    },
    yAxisKey: {
      name: 'yAxisKey',
      type: 'string',
      description: 'Y axis key name to be used in the data array',
      defaultValue: 'y'
    }
  }
})

page
  .createChapter()
  .addExample('AnalyticsChart/story/Default.example.tsx', 'Default')
