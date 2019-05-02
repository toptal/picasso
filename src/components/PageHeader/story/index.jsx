import PicassoBook from '~/.storybook/components/PicassoBook'

import { PageHeader } from '../PageHeader'

const componentDocs = PicassoBook.createComponentDocs(PageHeader, 'Page.Header')

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Page.Header', `A Header component`)
    .addExample('PageHeader/story/Default.example.jsx', 'Default')
    .addExample('PageHeader/story/RightContent.example.jsx', 'Right content')
)

export default {
  componentDocs,
  chapter
}
