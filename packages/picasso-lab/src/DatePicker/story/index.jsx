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
  .addExample('DatePicker/story/Default.example.tsx', 'Default') // picasso-skip-visuals
  .addExample('DatePicker/story/Range.example.tsx', 'Range Mode') // picasso-skip-visuals
  .addExample('DatePicker/story/WithOnBlurHandler.example.tsx', {
    title: 'With onBlur handler',
    description: 'Fire onBlur handler on click outside or navigate with tab'
  }) // picasso-skip-visuals
  .addExample('DatePicker/story/WithNoHideOnSelect.example.tsx', {
    title: 'With no hideOnSelect',
    description: 'Do not hide calendar on date select'
  }) // picasso-skip-visuals
  .addExample(
    'DatePicker/story/WithInitialValue.example.tsx',
    'With initial value specified'
  ) // picasso-skip-visuals
  .addExample('DatePicker/story/WithInputProps.example.tsx', 'With Input Props') // picasso-skip-visuals
