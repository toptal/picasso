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
  .addExample('BarChart/story/BarIndicator.example.tsx', {
    title: 'Bar indicator',
    description:
      'Bars can have a letter indicator.',
    takeScreenshot: false,
  })
  