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
  .addExample('DetailedList/story/Stripped.example.jsx', 'Stripped')
