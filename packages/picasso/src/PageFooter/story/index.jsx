import { PageFooter } from '../PageFooter'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(PageFooter, 'Page.Footer')

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Page.Footer', 'A Footer component')
    .addExample('PageFooter/story/Default.example.jsx', 'Default')
    .addExample('PageFooter/story/RightContent.example.jsx', 'Right content')
)

export default {
  componentDocs,
  chapter
}
