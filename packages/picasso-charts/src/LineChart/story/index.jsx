import LineChart from '../LineChart'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Charts').createPage(
  'LineChart',
  'Responsive line charts'
)

export const sharedChartDocs = {
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
  },
  unit: {
    name: 'unit',
    type: 'string',
    description: 'Text label to be displayed on the Y axis',
    defaultValue: 'd'
  },
  height: {
    name: 'height',
    type: 'number',
    description: 'Fixed height of chart',
    defaultValue: '200px'
  },
  xAxisKey: {
    name: 'xAxisKey',
    type: 'string',
    description: 'Name of point on the horizontal axis',
    defaultValue: 'x'
  },
  tooltip: {
    name: 'tooltip',
    type: 'boolean',
    description: 'Toggle tooltip on hover',
    defaultValue: false
  },
  customTooltip: {
    name: 'customTooltip',
    type: 'ReactElement',
    description: 'Requires `tooltip` to be `true`'
  },
  allowTooltipEscapeViewBox: {
    name: 'allowTooltipEscapeViewBox',
    type: 'boolean',
    description:
      'Allows the tooltip to extend beyond the viewBox of the chart itself'
  },
  showBottomYAxisLabel: {
    name: 'showBottomYAxisLabel',
    type: 'boolean',
    description: 'Shows the bottom Y axis label',
    defaultValue: false
  },
  showEvenYAxisTicks: {
    name: 'showEvenYAxisTicks',
    type: 'boolean',
    description: 'Shows even Y ticks',
    defaultValue: false
  }
}

page.createTabChapter('Props').addComponentDocs({
  component: LineChart,
  name: 'LineChart',
  additionalDocs: Object.assign(sharedChartDocs, {
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
  .addExample('LineChart/story/EvenYAxisTicks.example.tsx', 'Even Y axis ticks')
  .addExample(
    'LineChart/story/BottomYAxisLabel.example.tsx',
    'Show bottom Y axis label'
  )
