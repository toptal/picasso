import PicassoBook from '~/.storybook/components/PicassoBook'
import BarChart from '../BarChart'

const page = PicassoBook.section('Picasso Charts').createPage(
  'BarChart',
  `Responsive bar charts
  
  ${PicassoBook.createSourceLink(__filename)}
  `
)

page.createTabChapter('Props').addComponentDocs({
  component: BarChart,
  name: 'BarChart',
})

page
  .createChapter()
  .addExample('BarChart/story/Default.example.tsx', {
    title: 'Default',
    takeScreenshot: false,
  })
  .addExample('BarChart/story/Tooltip.example.tsx', {
    title: 'Tooltip',
    description:
      'Bar chart has built-in tooltips support. You can enable them via `tooltip` prop.',
    takeScreenshot: false,
  })
  .addExample('BarChart/story/BarIndicator.example.tsx', {
    title: 'Bar indicator',
    description: 'Bars can have a customized indicator.',
    takeScreenshot: false,
  })
  .addExample('BarChart/story/AutoSize.example.tsx', {
    title: 'Auto size',
    description: 'Bars try to fill all the space of the chart',
    takeScreenshot: false,
  })
  .addExample('BarChart/story/VerticalBar.example.tsx', {
    title: 'Vertical Bar',
    description: 'You can change the layout of the BarChart.',
    takeScreenshot: false,
  })
  .addExample('BarChart/story/Customized.example.tsx', {
    title: 'Customized',
    description:
      "You can customize chart's tooltip, height, width, fill and label colors.",
    takeScreenshot: false,
  })
  .addExample('BarChart/story/Stacked.example.tsx', {
    title: 'Stacked',
    description:
      'Bars can be stacked on top of each other by providing `stackedBars`',
    takeScreenshot: false,
  })
  .addExample('BarChart/story/StackedWithBarChartIndicators.example.tsx', {
    title: 'Stacked with bar chart indicators',
    description: 'Bars can have a customized indicator.',
    takeScreenshot: false,
  })
  .addExample('BarChart/story/HideBarLabel.example.tsx', {
    title: 'Hide bar label',
    description:
      'You can hide label of each bar via `showBarLabel` prop being set to `false`.',
    takeScreenshot: false,
  })
  .addExample('BarChart/story/ShowEveryNthTick.example.tsx', {
    title:
      'Show every Nth tick on X or Y-axis (or hide axis labels completely)',
    description: `You can show every Nth tick for X-axis or Y-axis. "0" hides all ticks, "1" shows all ticks (default behavior). The example below has "showEveryNthTickOnXAxis={3}" (every third tick is shown on X-axis) and "showEveryNthTickOnYAxis={0}" (no ticks are shown on Y-axis).`,
    takeScreenshot: false,
  })
  .addExample('BarChart/story/ValueAxisTickFormatter.example.tsx', {
    title: 'Format the value axis',
    description:
      'You can format the ticks on the value axis by providing the format function in the `valueAxisTickFormatter` property.',
    takeScreenshot: false,
  })
