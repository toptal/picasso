import PicassoBook from '~/.storybook/components/PicassoBook'

import { DatePicker } from '../DatePicker'

const page = PicassoBook.createPage(
  'DatePicker',
  `Date Picker component`
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: DatePicker, name: 'DatePicker' })

page
  .createChapter()
  .addExample('lab/DatePicker/story/Default.example.tsx', 'Default')
  .addExample('lab/DatePicker/story/Range.example.tsx', 'Range Mode')
