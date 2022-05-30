import { MonthSelect } from '../MonthSelect'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'MonthSelect',
  'Month selector'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: MonthSelect, name: 'MonthSelect' })

page
  .createChapter()
  .addExample('MonthSelect/story/Default.example.tsx', 'Default')
  .addExample('MonthSelect/story/Filter.example.tsx', {
    title: 'Filter months and years',
    takeScreenshot: false
  }) // picasso-skip-visuals
