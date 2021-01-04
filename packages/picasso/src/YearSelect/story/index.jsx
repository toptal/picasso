import { YearSelect } from '../YearSelect'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'YearSelect',
  'Year select'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: YearSelect, name: 'YearSelect' })

page
  .createChapter()
  .addExample('YearSelect/story/Default.example.tsx', 'Default')
