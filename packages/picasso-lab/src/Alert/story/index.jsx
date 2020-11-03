import { Alert } from '@toptal/picasso-lab'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage('Alert')

page.createTabChapter('Props').addComponentDocs({
  component: Alert,
  name: 'Alert'
})

page
  .createChapter()
  .addExample('Alert/story/Default.example.tsx', 'Default')
  .addExample('Alert/story/Close.example.tsx', 'Closable alert')
