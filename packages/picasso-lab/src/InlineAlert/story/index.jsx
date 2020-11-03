import { InlineAlert } from '@toptal/picasso-lab'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage('InlineAlert')

page.createTabChapter('Props').addComponentDocs({
  component: InlineAlert,
  name: 'InlineAlert'
})

page
  .createChapter()
  .addExample('InlineAlert/story/Default.example.tsx', 'Default')
