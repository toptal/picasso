import PicassoBook from '../../../.storybook/components/PicassoBook'
import { TableHead } from '../TableHead'

PicassoBook.lookupPage('Table')
  .createChapter('Table.Head', 'Table Header')
  .addComponentDocs(TableHead)
