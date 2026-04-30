import { Alert } from '../Alert'
import PicassoBook from '~/.storybook/components/PicassoBook'
import alertInlineStory from '../../AlertInline/story'

const page = PicassoBook.section('Components').createPage(
  'Alert',
  `
    Use to alert user about important information

    ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: Alert,
    name: 'Alert',
  })
  .addComponentDocs(alertInlineStory.componentDocs)

page
  .createChapter()
  .addExample('Alert/story/Default.example.tsx', 'Default', 'base/Alert')
  .addExample('Alert/story/Close.example.tsx', 'Closable alert', 'base/Alert')
  .addExample(
    'Alert/story/Actions.example.tsx',
    'Alert with actions',
    'base/Alert'
  )

page.connect(alertInlineStory.chapter)
