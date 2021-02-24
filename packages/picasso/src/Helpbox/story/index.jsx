import helpboxTitleStory from '../../HelpboxTitle/story'
import helpboxContentStory from '../../HelpboxContent/story'
import helpboxActionsStory from '../../HelpboxActions/story'
import { Helpbox } from '../Helpbox'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Helpbox',
  `
    Container specialized for rendering suggestions
    
    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/87f2b162-ed36-40c3-a715-921ac1950eeb?collectionLayerId=01b492e6-1b02-41f4-ba00-b27f273e909b&mode=design&present=true'
    )}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Helpbox, name: 'Helpbox' })
  .addComponentDocs(helpboxTitleStory.componentDocs)
  .addComponentDocs(helpboxContentStory.componentDocs)
  .addComponentDocs(helpboxActionsStory.componentDocs)

page
  .createChapter()
  .addExample('Helpbox/story/Default.example.tsx', 'Default')
  .addExample('Helpbox/story/Actions.example.tsx', 'With actions')
  .addExample('Helpbox/story/Closeable.example.tsx', 'Closeable')
  .addExample('Helpbox/story/Width.example.tsx', 'Width')
