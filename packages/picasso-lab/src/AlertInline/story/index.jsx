import { AlertInline } from '@toptal/picasso-lab'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage('AlertInline')

page.createTabChapter('Props').addComponentDocs({
  component: AlertInline,
  name: 'AlertInline'
})

page
  .createChapter()
  .addExample('AlertInline/story/Default.example.tsx', 'Default')
