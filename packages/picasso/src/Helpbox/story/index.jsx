import helpboxTitleStory from '../../HelpboxTitle/story'
import helpboxContentStory from '../../HelpboxContent/story'
import helpboxActionsStory from '../../HelpboxActions/story'
import { Helpbox } from '../Helpbox'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Helpbox',
  'Container specialized for rendering suggestions'
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
