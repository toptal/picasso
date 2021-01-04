import { TableCell } from '../TableCell'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  TableCell,
  'Table.Cell',
  'Cell for table content'
)

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Table.Cell', 'Cell for table content')
    .addExample('TableCell/story/Alignments.example.tsx', 'Alignments')
)

export default {
  chapter,
  componentDocs
}
