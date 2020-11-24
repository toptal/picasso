import { TopBar } from '../TopBar'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(TopBar, 'Page.TopBar')

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Page.TopBar', 'A TopBar component')
    .addExample('TopBar/story/Default.example.jsx', 'Default')
    .addExample('TopBar/story/Variants.example.jsx', 'Variants')
    .addExample('TopBar/story/LeftContent.example.jsx', {
      title: 'Left content',
      waitUntilImagesLoaded: true
    })
    .addExample('TopBar/story/RightContent.example.jsx', {
      title: 'Right content',
      waitUntilImagesLoaded: true
    })
    .addExample('TopBar/story/ExtraMenuContent.example.jsx', {
      title: 'Extra header menu content',
      waitUntilImagesLoaded: true
    })
    .addExample('TopBar/story/Link.example.jsx', 'With link')
    .addExample('TopBar/story/WithoutTitle.example.jsx', 'Without title')
)

export default {
  componentDocs,
  chapter
}
