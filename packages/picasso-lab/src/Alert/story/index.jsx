import { Alert } from '../Alert'
import PicassoBook from '~/.storybook/components/PicassoBook'
import alertInlineStory from '../../AlertInline/story'

const page = PicassoBook.section('Picasso Lab').createPage(
  'Alert',
  `
    Use to alert user about important information
    
    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/36978a1a-5565-4f00-a772-cf05c01878d7?collectionLayerId=523fc9cb-a325-4cd4-b9d7-e61c1bb7f2ee&mode=design&present=true'
    )}
  `
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
