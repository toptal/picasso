import PicassoBook from '~/.storybook/components/PicassoBook'

import { DatePicker } from '../DatePicker'

const page = PicassoBook.createPage(
  'DatePicker',
  `Date Picker component`,
  'Lab'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: DatePicker, name: 'DatePicker' })

page
  .createChapter()
  .addExample('lab/DatePicker/story/Default.example.tsx', 'Default') // picasso-skip-visuals
  .addExample('lab/DatePicker/story/Range.example.tsx', 'Range Mode') // picasso-skip-visuals
  .addExample(
    'lab/DatePicker/story/InitialValue.example.tsx',
    'With initial value specified'
  ) // picasso-skip-visuals
