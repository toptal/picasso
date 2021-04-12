import Drilldown from '../Drilldown'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Lab').createPage(
  'Drilldown',
  `
    Drilldown selection list.
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Drilldown, name: 'Drilldown' })

page.createChapter().addExample('Quote/story/Default.example.tsx', 'Default')
