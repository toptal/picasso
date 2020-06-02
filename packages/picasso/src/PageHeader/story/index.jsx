import { PageHeader } from '../PageHeader'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(PageHeader, 'Page.Header')

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Page.Header', 'A Header component')
    .addExample('PageHeader/story/Default.example.jsx', 'Default')
    .addExample('PageHeader/story/Variants.example.jsx', 'Variants')
    .addExample('PageHeader/story/LeftContent.example.jsx', {
      title: 'Left content',
      waitUntilImagesLoaded: true
    })
    .addExample('PageHeader/story/RightContent.example.jsx', {
      title: 'Right content',
      waitUntilImagesLoaded: true
    })
    .addExample('PageHeader/story/ExtraMenuContent.example.jsx', {
      title: 'Extra header menu content',
      waitUntilImagesLoaded: true
    })
    .addExample('PageHeader/story/Link.example.jsx', 'With link')
    .addExample('PageHeader/story/WithoutTitle.example.jsx', 'Without title')
)

export default {
  componentDocs,
  chapter
}
