import { DetailedList } from '../DetailedList'
import PicassoBook from '~/.storybook/components/PicassoBook'
import detailedListItemStory from '../../DetailedListItem/story'

const page = PicassoBook.section('Components').createPage('DetailedList')

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: DetailedList,
    name: 'DetailedList',
    additionalDocs: {
      children: {
        type: {
          name: 'ReactElement<DetailedListItemProps>[]'
        }
      }
    }
  })
  .addComponentDocs(detailedListItemStory.componentDocs)

page
  .createChapter()
  .addExample('DetailedList/story/Default.example.jsx', 'Default')
