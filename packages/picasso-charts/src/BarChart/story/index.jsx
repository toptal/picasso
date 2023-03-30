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
  .addExample('BarChart/story/HideBarLabel.example.tsx', {
    title: 'Hide bar label',
    description:
      'You can hide label of each bar via `showBarLabel` prop being set to `false`.',
    takeScreenshot: false,
  })
