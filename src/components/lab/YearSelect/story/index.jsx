import PicassoBook from '~/.storybook/components/PicassoBook'

import { YearSelect } from '../YearSelect'

const page = PicassoBook.createPage('YearSelect', `Year select`, 'Lab')

page
  .createTabChapter('Props')
  .addComponentDocs({ component: YearSelect, name: 'YearSelect' })

page
  .createChapter()
  .addExample('lab/YearSelect/story/Default.example.jsx', 'Default')
