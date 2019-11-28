import PicassoBook from '~/.storybook/components/PicassoBook'

import { MonthSelect } from '../MonthSelect'

const page = PicassoBook.createPage('MonthSelect', 'Month selector', 'Lab')

page
  .createTabChapter('Props')
  .addComponentDocs({ component: MonthSelect, name: 'MonthSelect' })

page
  .createChapter()
  .addExample('MonthSelect/story/Default.example.jsx', 'Default')
  .addExample('MonthSelect/story/Filter.example.jsx', 'Filter months and years') // picasso-skip-visuals
