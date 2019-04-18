import PicassoBook from '~/.storybook/components/PicassoBook'

import { TableCell } from '../TableCell'

PicassoBook.lookupPage('Table')
  .createChapter('Table.Cell', 'Cell for table content')
  .addComponentDocs(TableCell)
  .addExample('TableCell/story/Default.example.jsx', 'Aligments')
