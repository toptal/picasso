import { DetailedList } from '../DetailedList'
import PicassoBook from '~/.storybook/components/PicassoBook'
import detailedItemStory from '../../DetailedListItem/story'
import detailedColumnStory from '../../DetailedListColumn/story'

const page = PicassoBook.section('Lab').createPage('DetailedList')

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: DetailedList,
    name: 'DetailedList',
    additionalDocs: {
      children: {
        type: {
          name: 'DetailedList.Column[]'
        }
      }
    }
  })
  .addComponentDocs(detailedColumnStory.componentDocs)
  .addComponentDocs(detailedItemStory.componentDocs)

page
  .createChapter()
  .addExample('DetailedList/story/Default.example.jsx', 'Default')
  .addExample('DetailedList/story/Striped.example.jsx', 'Striped')
  .addExample('DetailedList/story/OneColumn.example.jsx', 'One column')
