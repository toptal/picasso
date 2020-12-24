import { PageArticle } from '../PageArticle'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Page.Article', 'Use as a page content container')
    .addExample('PageArticle/story/Default.example.tsx', 'Default')
)

const componentDocs = PicassoBook.createComponentDocs(
  PageArticle,
  'Page.Article'
)

export default {
  chapter,
  componentDocs
}
