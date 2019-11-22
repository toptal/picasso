import PicassoBook from '~/.storybook/components/PicassoBook'

import { TableCell } from '../TableCell'

const componentDocs = PicassoBook.createComponentDocs(
  TableCell,
  'Table.Cell',
  'Cell for table content'
)

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Table.Cell', 'Cell for table content')
    .addExample('TableCell/story/Alignments.example.jsx', 'Alignments')
)

export default {
  chapter,
  componentDocs
}
