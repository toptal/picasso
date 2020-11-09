import { DetailedList } from '../DetailedList'
import PicassoBook from '~/.storybook/components/PicassoBook'
import detailedListItemStory from '../../DetailedListItem/story'

const page = PicassoBook.section('Lab').createPage('DetailedList')

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: DetailedList,
    name: 'DetailedList'
  })
  .addComponentDocs(detailedListItemStory.componentDocs)

page
  .createChapter()
  .addExample('DetailedList/story/Default.example.jsx', 'Default')
  .addExample('DetailedList/story/Stripped.example.jsx', 'Stripped')
