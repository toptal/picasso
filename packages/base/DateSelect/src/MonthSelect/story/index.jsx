import { MonthSelect } from '../MonthSelect'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'MonthSelect',
  `Month selector

  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: MonthSelect, name: 'MonthSelect' })

page
  .createChapter()
  .addExample(
    'MonthSelect/story/Default.example.tsx',
    'Default',
    'base/DateSelect'
  )
  .addExample(
    'MonthSelect/story/Filter.example.tsx',
    {
      title: 'Filter months and years',
      takeScreenshot: false,
    },
    'base/DateSelect'
  )
