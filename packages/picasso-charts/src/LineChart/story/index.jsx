import LineChart from '../LineChart'
import { sharedChartDocs } from '../../BarChart/story'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Charts').createPage(
  'LineChart',
  'Responsive line charts'
)

export const sharedLineChartDocs = Object.assign({}, sharedChartDocs, {
  unit: {
    name: 'unit',
    type: 'string',
    description: 'Text label to be displayed on the Y axis',
    defaultValue: 'd'
  },
  xAxisKey: {
    name: 'xAxisKey',
    type: 'string',
    description: 'Name of point on the horizontal axis',
    defaultValue: 'x'
  },
  showBottomYAxisLabel: {
    name: 'showBottomYAxisLabel',
    type: 'boolean',
    description: 'Shows the bottom Y axis label',
    defaultValue: false
  },
  lineConfig: {
    name: 'lineConfig',
    type: {
      name: '{}',
      description:
        "{ [key: string]: { color: string; variant?: 'solid' | 'reference' } }"
    },
    description:
      "A dictionary of each line name as a key and the line's color and variant for value",
    required: true
  }
})

page.createTabChapter('Props').addComponentDocs({
  component: LineChart,
  name: 'LineChart',
  additionalDocs: Object.assign({}, sharedLineChartDocs, {
    data: {
      name: 'data',
      type: {
        name: '[]',
        description: '{ [key: string]: string | number }'
      },
      description: 'A list of data points to be rendered as a line chart',
      required: true
    },
    highlights: {
      name: 'highlights',
      type: {
        name: '[]',
        description: `{ from: number, to: number, color: string }`
      },
      description: 'A list of regions to be highlighted'
    },
    referenceLines: {
      name: 'referenceLines',
      type: {
        name: '[]',
        description: `{ y: number, color: string }`
      },
      description:
        'Will display a full-width horizontal dashed line at the specified height in the specified color'
    }
  })
})

page
  .createChapter()
  .addExample('LineChart/story/Default.example.tsx', 'Default')
  .addExample('LineChart/story/Multiple.example.tsx', 'Multiple Lines')
  .addExample(
    'LineChart/story/BottomYAxisLabel.example.tsx',
    'Show bottom Y axis label'
  )
