import LineChart from '../LineChart'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Charts').createPage(
  'LineChart',
  `Responsive line charts
  
  ${PicassoBook.createSourceLink(__filename)}
  `
)

page.createTabChapter('Props').addComponentDocs({
  component: LineChart,
  name: 'LineChart',
})

page
  .createChapter()
  .addExample('LineChart/story/Default.example.tsx', 'Default')
  .addExample('LineChart/story/Multiple.example.tsx', 'Multiple Lines')
  .addExample(
    'LineChart/story/BottomYAxisLabel.example.tsx',
    'Show bottom Y axis label'
  )
  .addExample('LineChart/story/TooltipEscapeViewBox.example.tsx', {
    title: 'Tooltip escaping the chart',
    description:
      'With `allowTooltipEscapeViewBox`, the tooltip can extend beyond the chart, which helps short charts. It follows the mouse, touch and keyboard (Tab to the chart, then use the arrow keys).',
  })
