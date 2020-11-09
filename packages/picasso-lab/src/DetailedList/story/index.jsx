import { DetailedList } from '../DetailedList'
import PicassoBook from '~/.storybook/components/PicassoBook'
import detailedListItemStory from '../../DetailedListItem/story'

const page = PicassoBook.section('Components').createPage('DetailedList')

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: DetailedList,
    name: 'DetailedList'
  })
  .addComponentDocs(detailedListItemStory.componentDocs)

page.createChapter().addExample('DetailedList/story/Default.example.jsx', {
  title: 'Default',
  effect: async (testPage, makeScreenshot) => {
    await testPage.click('[data-testid="trigger"]')
    await makeScreenshot({
      isFullScreen: true
    })
  }
})
