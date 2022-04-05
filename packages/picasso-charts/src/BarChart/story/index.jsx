import PicassoBook from '~/.storybook/components/PicassoBook'
import BarChart from '../BarChart'

const page = PicassoBook.section('Picasso Charts').createPage(
  'BarChart',
  'Responsive bar charts'
)

export const sharedChartDocs = {
  height: {
    name: 'height',
    type: 'number',
    description: 'Height of chart',
    defaultValue: '200px'
  },
  width: {
    name: 'width',
    type: 'number',
    description: 'Width of chart',
    defaultValue: 'auto'
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
  showBarLabel: {
    name: 'showBarLabel',
    type: 'boolean',
    description: 'Shows label of each bar',
    defaultValue: true
  }
}

page.createTabChapter('Props').addComponentDocs({
  component: BarChart,
  name: 'BarChart',
  additionalDocs: Object.assign({}, sharedChartDocs, {
    data: {
      name: 'data',
      type: {
        name: '[]',
        description: '{ name: string; value: { [key: K]: number } }'
      },
      description: 'A list of data points to be rendered as a bar chart',
      required: true
    },
    getBarColor: {
      name: 'getBarColor',
      type: {
        name: 'function',
        description: `(params: {
          dataKey: string
          entry?: {
            name: string
            value: { [key in K]: number }
          }
          index?: number
        }) => string`
      },
      description: "Maps bar's key with a color to fill.",
      required: false
    },
    getBarLabelColor: {
      name: 'getBarLabelColor',
      type: {
        name: 'function',
        description: '(params: { dataKey: string; index?: number }) => string'
      },
      description: "Maps bar's key with a label color.",
      required: false
    }
  })
})

page
  .createChapter()
  .addExample('BarChart/story/Default.example.tsx', {
    title: 'Default',
    delay: 500
  })
  .addExample('BarChart/story/Tooltip.example.tsx', {
    title: 'Tooltip',
    description:
      'Bar chart has built-in tooltips support. You can enable them via `tooltip` prop.',
    effect: async (testPage, makeScreenshot) => {
      await testPage.mouse.move(100, 100)
      await makeScreenshot()
    },
    delay: 500
  })
  .addExample('BarChart/story/Customized.example.tsx', {
    title: 'Customized',
    description:
      "You can customize chart's tooltip, height, width, fill and label colors.",
    effect: async (testPage, makeScreenshot) => {
      await testPage.mouse.move(100, 100)
      await makeScreenshot()
    },
    delay: 500
  })
  .addExample('BarChart/story/HideBarLabel.example.tsx', {
    title: 'Hide bar label',
    description:
      'You can hide label of each bar via `showBarLabel` prop being set to `false`.'
  }) // picasso-skip-visuals
