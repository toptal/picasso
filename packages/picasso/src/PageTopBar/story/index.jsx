import { PageTopBar } from '../PageTopBar'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(PageTopBar, 'Page.TopBar')

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Page.TopBar', 'A PageTopBar component')
    .addExample('PageTopBar/story/Default.example.tsx', 'Default')
    .addExample('PageTopBar/story/Variants.example.tsx', 'Variants')
    .addExample('PageTopBar/story/LeftContent.example.tsx', {
      title: 'Left content',
      waitUntilImagesLoaded: true
    })
    .addExample('PageTopBar/story/RightContent.example.tsx', {
      title: 'Right content',
      waitUntilImagesLoaded: true
    })
    .addExample('PageTopBar/story/ExtraMenuContent.example.tsx', {
      title: 'Extra header menu content',
      waitUntilImagesLoaded: true
    })
    .addExample('PageTopBar/story/Link.example.tsx', 'With link')
    .addExample('PageTopBar/story/WithoutTitle.example.tsx', 'Without title')
)

export default {
  componentDocs,
  chapter
}
