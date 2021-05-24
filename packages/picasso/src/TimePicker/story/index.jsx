import { TimePicker } from '../TimePicker'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'TimePicker',
  'Time Picker component'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: TimePicker, name: 'TimePicker' })
page
  .createChapter()
  .addExample('TimePicker/story/Default.example.tsx', 'Default') // picasso-skip-visuals
