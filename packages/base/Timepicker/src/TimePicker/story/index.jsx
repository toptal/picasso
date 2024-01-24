import { TimePicker } from '../TimePicker'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'TimePicker',
  `Time Picker component

  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: TimePicker, name: 'TimePicker' })
page
  .createChapter()
  .addExample(
    'TimePicker/story/Default.example.tsx',
    {
      title: 'Default',
      takeScreenshot: false,
    },
    'base/Timepicker'
  )
  .addExample(
    'TimePicker/story/Status.example.tsx',
    {
      title: 'Status',
      takeScreenshot: false,
    },
    'base/Timepicker'
  )
