import PicassoBook from '~/.storybook/components/PicassoBook'

import { GridItem } from '../GridItem'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter(
      'Grid Item',
      'The element of the Grid. Should be nested inside the Grid element.'
    )
    .addExample('GridItem/story/Default.example.jsx', 'Default')
    .addExample('GridItem/story/SampleLayout.example.jsx', 'Sample Layout')
    .addExample('GridItem/story/CenteredLayout.example.jsx', 'Centered Layout')
)

const componentDocs = PicassoBook.createComponentDocs(GridItem, 'Grid.Item')

export default {
  chapter,
  componentDocs
}
