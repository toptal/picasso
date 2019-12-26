import { GridItem } from '../GridItem'

import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter(
      'Grid Item',
      'The element of the Grid. Should be nested inside the Grid element.'
    )
    .addExample('GridItem/story/Default.example.jsx', 'Default')
    .addExample('GridItem/story/Responsive.example.jsx', {
      title: 'Responsive',
      description:
        'You can try to resize screen, to see how different grid widths are applied.'
    })
    .addExample('GridItem/story/SampleLayout.example.jsx', 'Sample Layout')
    .addExample('GridItem/story/CenteredLayout.example.jsx', 'Centered Layout')
)

const componentDocs = PicassoBook.createComponentDocs(GridItem, 'Grid.Item')

export default {
  chapter,
  componentDocs
}
