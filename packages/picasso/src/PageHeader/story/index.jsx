import PicassoBook from '~/.storybook/components/PicassoBook'

import { PageHeader } from '../PageHeader'

const componentDocs = PicassoBook.createComponentDocs(PageHeader, 'Page.Header')

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Page.Header', `A Header component`)
    .addExample('PageHeader/story/Default.example.jsx', 'Default')
    .addExample('PageHeader/story/Variants.example.jsx', 'Variants')
    .addExample('PageHeader/story/RightContent.example.jsx', 'Right content')
    .addExample(
      'PageHeader/story/ExtraMenuContent.example.jsx',
      'Extra header menu content'
    )
    .addExample('PageHeader/story/Link.example.jsx', 'With link')
    .addExample('PageHeader/story/WithoutTitle.example.jsx', 'Without title')
)

export default {
  componentDocs,
  chapter
}
