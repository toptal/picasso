import { Quote } from '../Quote'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Quote',
  `
    Use quotes to highlight quoted content.
    
    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/3959dd57-2e08-4517-ae8b-8c2d7431bd44?collectionLayerId=97ccaca0-0f30-4039-9cae-7e952504bd79&mode=design&present=true'
    )}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Quote, name: 'Quote' })

page.createChapter().addExample('Quote/story/Default.example.tsx', {
  title: 'Default',
  takeScreenshot: true
})
