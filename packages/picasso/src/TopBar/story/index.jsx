import { TopBar } from '../TopBar'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(TopBar, 'Page.TopBar')

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Page.TopBar', 'A TopBar component')
    .addExample('TopBar/story/Default.example.tsx', 'Default')
    .addExample('TopBar/story/Variants.example.tsx', 'Variants')
    .addExample('TopBar/story/LeftContent.example.tsx', {
      title: 'Left content',
      waitUntilImagesLoaded: true
    })
    .addExample('TopBar/story/RightContent.example.tsx', {
      title: 'Right content',
      waitUntilImagesLoaded: true
    })
    .addExample('TopBar/story/ExtraMenuContent.example.tsx', {
      title: 'Extra header menu content',
      waitUntilImagesLoaded: true
    })
    .addExample('TopBar/story/Link.example.tsx', 'With link')
    .addExample('TopBar/story/WithoutTitle.example.tsx', 'Without title')
)

export default {
  componentDocs,
  chapter
}
