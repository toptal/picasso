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
  .addExample(
    'TimePicker/story/MinuteStep.example.tsx',
    {
      title: 'Minute step',
      description:
        'Pass `minuteStep` to replace the browser time picker with a list of times at that interval. Any other time can still be typed',
      takeScreenshot: false,
    },
    'base/Timepicker'
  )
