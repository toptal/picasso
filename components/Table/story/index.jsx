import PicassoBook from '../../../.storybook/components/PicassoBook'
import { Table } from '../Table'

const page = PicassoBook.createPage('Table', `Display sets of data`)

page
  .addComponentDocs(Table)
  .addExample('Table/story/Default.example.jsx', 'Plain table')
  .addExample('Table/story/Select.example.jsx', 'Selectable table')
