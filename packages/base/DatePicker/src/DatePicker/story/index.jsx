import { DatePicker } from '../DatePicker'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'DatePicker',
  `
    Date Picker component

    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/cc5f669e-ee2c-4375-946d-93b20db16ecc?collectionLayerId=10d3230f-5c9c-4fed-85b2-5cfda0bcd25f&mode=design&present=true'
    )}

    ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: DatePicker, name: 'DatePicker' })

page
  .createChapter()
  .addExample(
    'DatePicker/story/Default.example.tsx',
    {
      title: 'Default',
      takeScreenshot: false,
    },
    'base/DatePicker'
  )
  .addExample(
    'DatePicker/story/Range.example.tsx',
    {
      title: 'Range Mode',
      takeScreenshot: false,
    },
    'base/DatePicker'
  )
  .addExample(
    'DatePicker/story/Drawer.example.tsx',
    {
      title: 'Drawer',
      takeScreenshot: false,
    },
    'base/DatePicker'
  )
  .addExample(
    'DatePicker/story/WithOnBlurHandler.example.tsx',
    {
      title: 'With onBlur handler',
      description: 'Fire onBlur handler on click outside or navigate with tab',
      takeScreenshot: false,
    },
    'base/DatePicker'
  )
  .addExample(
    'DatePicker/story/WithNoHideOnSelect.example.tsx',
    {
      title: 'With no hideOnSelect',
      description: 'Do not hide calendar on date select',
      takeScreenshot: false,
    },
    'base/DatePicker'
  )
  .addExample(
    'DatePicker/story/WithResetButton.example.tsx',
    {
      title: 'With reset button',
      takeScreenshot: false,
    },
    'base/DatePicker'
  )
  .addExample(
    'DatePicker/story/WithInitialValue.example.tsx',
    {
      title: 'With initial value specified',
      takeScreenshot: false,
    },
    'base/DatePicker'
  )
  .addExample(
    'DatePicker/story/WithInputProps.example.tsx',
    {
      title: 'With Input Props',
      takeScreenshot: false,
    },
    'base/DatePicker'
  )
  .addExample(
    'DatePicker/story/Autocomplete.example.tsx',
    {
      title: 'Autocomplete',
      takeScreenshot: false,
    },
    'base/DatePicker'
  )
  .addExample(
    'DatePicker/story/Status.example.tsx',
    {
      title: 'Status',
      takeScreenshot: false,
    },
    'base/DatePicker'
  )
  .addExample(
    'DatePicker/story/WithSelectionLimits.example.tsx',
    {
      title: 'With Selection Limits',
      takeScreenshot: false,
    },
    'base/DatePicker'
  )
  .addExample(
    'DatePicker/story/WithCustomDayRendering.example.tsx',
    {
      title: 'With Custom Day rendering',
      takeScreenshot: false,
    },
    'base/DatePicker'
  )
  .addExample(
    'DatePicker/story/WithTimezone.example.tsx',
    {
      title: 'With Timezone',
      takeScreenshot: false,
    },
    'base/DatePicker'
  )
  .addExample(
    'DatePicker/story/WithInputCustomValueParser.example.tsx',
    {
      title: "With DatePicker's Input custom value parser",
      description:
        'Type any year value like `2015` to get a random date within this year',
      takeScreenshot: false,
    },
    'base/DatePicker'
  )
  .addExample(
    'DatePicker/story/WithIndicatedRange.example.tsx',
    {
      title: 'With Indicated Range',
      description: 'Show as indicated a range of dates',
      takeScreenshot: false,
    },
    'base/DatePicker'
  )
  .addExample(
    'DatePicker/story/WithFooter.example.tsx',
    {
      title: 'With Footer',
      description: 'Show a custom footer at the bottom of the calendar',
      takeScreenshot: false,
    },
    'base/DatePicker'
  )
  .addExample(
    'DatePicker/story/WithFooterBackgroundColor.example.tsx',
    {
      title: 'With Footer background color customized',
      description: 'Show a custom color footer at the bottom of the calendar',
      takeScreenshot: false,
    },
    'base/DatePicker'
  )
  .addExample(
    'DatePicker/story/WithTwoMonths.example.tsx',
    {
      title: 'With two months',
      description:
        'Display two months at the same time (not applicable to screens below SM size)',
      takeScreenshot: false,
    },
    'base/DatePicker'
  )
