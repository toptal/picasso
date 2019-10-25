import PicassoBook from '~/.storybook/components/PicassoBook'

import helpboxTitleStory from '@components/HelpboxTitle/story'
import helpboxContentStory from '@components/HelpboxContent/story'
import helpboxActionsStory from '@components/HelpboxActions/story'

import { Helpbox } from '../Helpbox'

const page = PicassoBook.createPage(
  'Helpbox',
  `Container specialized for rendering suggestions`
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Helpbox, name: 'Helpbox' })
  .addComponentDocs(helpboxTitleStory.componentDocs)
  .addComponentDocs(helpboxContentStory.componentDocs)
  .addComponentDocs(helpboxActionsStory.componentDocs)

page
  .createChapter()
  .addExample('Helpbox/story/Default.example.jsx', 'Default')
  .addExample('Helpbox/story/Actions.example.jsx', 'With actions')
  .addExample('Helpbox/story/Closeable.example.jsx', 'Closeable')

page.connect(helpboxContentStory.chapter)
