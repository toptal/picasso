import PicassoBook from '../../../.storybook/components/PicassoBook'
import { GridItem } from '../GridItem'

const page = PicassoBook.lookupPage('Grid')

const COLUMNS_ENUM = {
  type: 'enum',
  enums: ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
}

page
  .createChapter(
    'Grid Item',
    'The element of the Grid. Should be nested inside the Grid element.'
  )
  .addComponentDocs(GridItem, {
    small: COLUMNS_ENUM,
    medium: COLUMNS_ENUM,
    large: COLUMNS_ENUM
  })
  .addExample('GridItem/story/Default.example.jsx', 'Default')
  .addExample('GridItem/story/SampleLayout.example.jsx', 'Sample Layout')
  .addExample('GridItem/story/CenteredLayout.example.jsx', 'Centered Layout')
