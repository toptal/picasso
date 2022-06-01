import PicassoBook from '~/.storybook/components/PicassoBook'
import BarChart from '../BarChart'

const page = PicassoBook.section('Picasso Charts').createPage(
  'BarChart',
  'Responsive bar charts'
)

page.createTabChapter('Props').addComponentDocs({
  component: BarChart,
  name: 'BarChart'
})

page
  .createChapter()
  .addExample('BarChart/story/Default.example.tsx', {
    title: 'Default',
    takeScreenshot: false
  }) // picasso-skip-visuals
  .addExample('BarChart/story/Tooltip.example.tsx', {
    title: 'Tooltip',
    description:
      'Bar chart has built-in tooltips support. You can enable them via `tooltip` prop.',
    effect: async (testPage, makeScreenshot) => {
      await testPage.mouse.move(100, 100)
      await makeScreenshot()
    },
    delay: 500
  }) // skipped for animations
  .addExample('BarChart/story/Customized.example.tsx', {
    title: 'Customized',
    description:
      "You can customize chart's tooltip, height, width, fill and label colors.",
    effect: async (testPage, makeScreenshot) => {
      await testPage.mouse.move(100, 100)
      await makeScreenshot()
    },
    delay: 500
  }) // skipped for animations
  .addExample('BarChart/story/HideBarLabel.example.tsx', {
    title: 'Hide bar label',
    description:
      'You can hide label of each bar via `showBarLabel` prop being set to `false`.',
    takeScreenshot: false
  }) // picasso-skip-visuals
