import PicassoBook from '~/.storybook/components/PicassoBook'

import { DatePicker } from '../DatePicker'

const page = PicassoBook.createPage(
  'DatePicker',
  `<-- description -->`
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: DatePicker, name: 'DatePicker' })

page
  .createChapter()
  .addExample('DatePicker/story/Default.example.tsx', 'Default')
