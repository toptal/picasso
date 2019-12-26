import { PageBanner } from '../PageBanner'

import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Page.Banner', 'Use to show a banner on the page')
    .addExample('PageBanner/story/Default.example.jsx', 'Default')
    .addExample('PageBanner/story/Icon.example.jsx', 'With icon')
)

const componentDocs = PicassoBook.createComponentDocs(PageBanner, 'Page.Banner')

export default {
  chapter,
  componentDocs
}
