import PicassoBook from '~/.storybook/components/PicassoBook'

import { PageContent } from '../PageContent'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter(
      'Page.Content',
      'Use to layout correctly your content in Page'
    )
    .addExample('PageContent/story/Default.example.jsx', 'Default')
)

const componentDocs = PicassoBook.createComponentDocs(
  PageContent,
  'Page.Content'
)

export default {
  chapter,
  componentDocs
}
