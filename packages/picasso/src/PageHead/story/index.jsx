import { PageHead } from '../PageHead'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(PageHead, 'Page.Head')

const chapter = PicassoBook.connectToPage(page =>
  page.createChapter('Page.Head', 'Manipulate with document head')
    .addTextSection(`
      This component is a wrapper around react-helmet, you can use Page.Head as a drop-in replacement

      <Page.Head>
        <title>My custom title</title>
      </Page.Head>
    `)
)

export default {
  chapter,
  componentDocs
}
