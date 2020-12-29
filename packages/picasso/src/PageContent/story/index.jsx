import { PageContent } from '../PageContent'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter(
      'Page.Content',
      'Use to layout correctly your content in Page'
    )
    .addExample('PageContent/story/Default.example.tsx', 'Default')
)

const componentDocs = PicassoBook.createComponentDocs(
  PageContent,
  'Page.Content'
)

export default {
  chapter,
  componentDocs
}
