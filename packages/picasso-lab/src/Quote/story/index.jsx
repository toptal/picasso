import { Quote } from '../Quote'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Lab').createPage(
  'Quote',
  'Use quotes to highlight quoted content'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Quote, name: 'Quote' })

page.createChapter().addExample('Quote/story/Default.example.tsx', {
  title: 'Default',
  hasVisualScreenshot: true
})
