import PicassoBook from '~/.storybook/components/PicassoBook'

import { YearSelect } from '../YearSelect'

const page = PicassoBook.createPage('YearSelect', `Year select`)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: YearSelect, name: 'YearSelect' })

page
  .createChapter()
  .addExample('YearSelect/story/Default.example.jsx', 'Default')
