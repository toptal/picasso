import PicassoBook from '.storybook/components/PicassoBook'

import { TableBody } from '../TableBody'

PicassoBook.lookupPage('Table')
  .createChapter('Table.Body', 'Table Body')
  .addComponentDocs(TableBody)
