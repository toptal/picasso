import { Alert } from '../Alert'
import PicassoBook from '~/.storybook/components/PicassoBook'
import alertInlineStory from '../../AlertInline/story'

const page = PicassoBook.section('Picasso Lab').createPage(
  'Alert',
  'Use to alert user about important information'
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: Alert,
    name: 'Alert'
  })
  .addComponentDocs(alertInlineStory.componentDocs)

page
  .createChapter()
  .addExample('Alert/story/Default.example.tsx', 'Default')
  .addExample('Alert/story/Close.example.tsx', 'Closable alert')

page.connect(alertInlineStory.chapter)
