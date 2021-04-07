import CategoriesChart from '../CategoriesChart'
import { sharedLineChartDocs } from '../../../../picasso-charts/src/LineChart/story'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Charts').createPage(
  'CategoriesChart',
  'Use BarChart with analytics data'
)

page.createTabChapter('Props').addComponentDocs({
  component: CategoriesChart,
  name: 'CategoriesChart',
  additionalDocs: Object.assign({}, sharedLineChartDocs, {
    data: {
      name: 'data',
      type: {
        name: '[]',
        description: '{ id: string, values: { [key: string]: number | null } }'
      },
      description: 'A record of data points to be rendered as a line chart',
      required: true
    },
    highlights: {
      name: 'highlights',
      type: {
        name: '[]',
        description: '{ data: string[], color: string }'
      },
      description: 'A list of dates and to be highlighted'
    },
    referenceLines: {
      name: 'referenceLines',
      type: {
        name: '[]',
        description: `{ data: { [key: string]: number }, color: string }`
      },
      description:
        'A record of data points to be rendered as a dashed horizontal line'
    },
    formatXAxisLabel: {
      name: 'formatXAxisLabel',
      type: {
        name: 'function',
        description: `(label: string) => string`
      },
      description: 'A function to custom format the X axis label'
    },
    granularity: {
      name: 'granularity',
      type: "'month' | 'week' | 'day' | 'hour'",
      description: 'A value that helps formatting the chart'
    }
  })
})

page
  .createChapter()
  .addExample('CategoriesChart/story/Default.example.tsx', 'Default')
// .addExample('CategoriesChart/story/Multiple.example.tsx', 'Multiple')
// .addExample('CategoriesChart/story/NullValues.example.tsx', {
//   title: 'Null values',
//   description:
//     'You can provide `null` values as part of chart dataset. Those values will be indicated by "empty" dots on the chart. Additionally this information will be passed to custom tooltip component in case you will need it there.'
// })
// .addExample('CategoriesChart/story/Highlights.example.tsx', 'Highlights')
// .addExample(
//   'CategoriesChart/story/ReferenceLines.example.tsx',
//   'Reference Lines'
// )
// .addExample(
//   'CategoriesChart/story/FormatLabel.example.tsx',
//   'Custom Format xAxis Label'
// )
// .addExample('CategoriesChart/story/Granularity.example.tsx', 'Granularity')
