import PicassoBook from '.storybook/components/PicassoBook'

import { TableRow } from '../TableRow'

PicassoBook.lookupPage('Table')
  .createChapter('Table.Row', 'Table row container')
  .addComponentDocs(TableRow)
