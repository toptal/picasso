import { PageHelmet } from '../PageHelmet'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(PageHelmet, 'Page.Helmet')

const chapter = PicassoBook.connectToPage(page =>
  page.createChapter('Page.Helmet', 'Manipulate with document head')
    .addTextSection(`
      This component is a wrapper around react-helmet, you can use Page.Helmet as a drop-in replacement

      <Page.Helmet>
        <title>My custom title</title>
      </Page.Helmet>
    `)
)

export default {
  chapter,
  componentDocs
}
