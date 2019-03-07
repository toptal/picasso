import PicassoBook from '../../../.storybook/components/PicassoBook'
import { PageContent } from '../PageContent'

PicassoBook.lookupPage('Page')
  .createChapter(
    'Page content',
    'Use to layout correctly your content in Page '
  )
  .addComponentDocs(PageContent)
  .addExample('PageContent/story/Default.example.jsx', 'Default')
