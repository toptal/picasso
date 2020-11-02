import { Alert } from '@toptal/picasso-lab'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage(
  'Alert',
  'Use to alert user about important information'
)

page.createTabChapter('Props').addComponentDocs({
  component: Alert,
  name: 'Alert'
})

page
  .createChapter()
  .addExample('Alert/story/Default.example.tsx', 'Default')
  .addExample('Alert/story/Variants.example.tsx', 'Variants')
  .addExample('Alert/story/Close.example.tsx', 'Closable alert')
