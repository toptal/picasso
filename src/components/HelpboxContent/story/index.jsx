import PicassoBook from '~/.storybook/components/PicassoBook'

import { HelpboxContent } from '../HelpboxContent'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Helpbox Content', 'The element of the Helpbox.')
    .addExample(
      'HelpboxContent/story/SpecificTagName.example.jsx',
      'Content with a specific tag name'
    )
)

const componentDocs = PicassoBook.createComponentDocs(
  HelpboxContent,
  'Helpbox.Content'
)

export default {
  componentDocs,
  chapter
}
