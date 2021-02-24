import { DatePicker } from '../DatePicker'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Lab').createPage(
  'DatePicker',
  `
    Date Picker component
    
    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/cc5f669e-ee2c-4375-946d-93b20db16ecc?collectionLayerId=10d3230f-5c9c-4fed-85b2-5cfda0bcd25f&mode=design&present=true'
    )}
  `
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
  .addExample('DatePicker/story/Autocomplete.example.tsx', 'Autocomplete') // picasso-skip-visuals
  .addExample('DatePicker/story/Error.example.tsx', 'Error') // picasso-skip-visuals
  .addExample(
    'DatePicker/story/WithSelectionLimits.example.tsx',
    'With Selection Limits'
  ) // picasso-skip-visuals
  .addExample(
    'DatePicker/story/WithCustomDayRendering.example.tsx',
    'With Custom Day rendering'
  ) // picasso-skip-visuals
  .addExample('DatePicker/story/WithTimezone.example.tsx', 'With Timezone') // picasso-skip-visuals
