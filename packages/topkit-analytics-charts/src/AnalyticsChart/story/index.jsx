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
    color: {
      name: 'color',
      type: 'string',
      description: 'Color of the line chart',
      defaultValue: palette.blue.main
    },
    highlights: {
      name: 'highlights',
      type: {
        name: '{}',
        description: '{ data: string[], color: string }'
      },
      description: 'A list of dates and to be highlighted'
    },
    referenceLine: {
      name: 'referenceLine',
      type: {
        name: '{}',
        description: `{ data: { [key: string]: number }, color: string }`
      },
      description:
        'A record of data points to be rendered as a dashed horizontal line'
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
