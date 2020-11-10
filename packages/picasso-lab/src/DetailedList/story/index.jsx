import { DetailedList } from '../DetailedList'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage('DetailedList')

page.createTabChapter('Props').addComponentDocs({
  component: DetailedList,
  name: 'DetailedList'
})

page
  .createChapter()
  .addExample('DetailedList/story/Default.example.jsx', 'Default')
  .addExample('DetailedList/story/OneColumn.example.jsx', 'One column')
  .addExample('DetailedList/story/Striped.example.jsx', 'Striped')
  .addExample('DetailedList/story/FixedLayout.example.jsx', {
    title: 'Fixed layout',
    description:
      'Table has auto width and can have width bigger than the parent container. To prevent it you can specify a fixed table width.'
  })
  .addExample('DetailedList/story/CustomFlow.example.jsx', {
    title: 'Custom flow',
    description:
      'There are cases when the original items flow does not match requirement. Items can be aggregated before passing to the props to control each column content.'
  })
