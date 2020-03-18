import { TypographyOverflow } from '../TypographyOverflow'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage(
  'TypographyOverflow',
  'Show tooltip when typography overflows'
)

page.createTabChapter('Props').addComponentDocs({
  component: TypographyOverflow,
  name: 'TypographyOverflow'
})

page
  .createChapter()
  .addExample('TypographyOverflow/story/Default.example.jsx', {
    title: 'Default'
  })
