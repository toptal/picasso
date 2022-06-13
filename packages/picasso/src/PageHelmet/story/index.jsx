import { PageHelmet } from '../PageHelmet'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(PageHelmet, 'Page.Helmet')

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Page.Helmet', 'Manipulate with document head')
    .addTextSection(
      `
      This component is a wrapper around react-helmet, you can use Page.Helmet as a drop-in replacement

      <Page.Helmet>
        <title>My custom title</title>
      </Page.Helmet>
    `
    )
    .addTextSection(
      'ℹ️ To use this component with SSR you might need to perform some extra setup.'
    )
    .addTextSection(
      'Please refer to the original [react-helmet documentation](https://www.npmjs.com/package/react-helmet#server-usage).'
    )
    .addTextSection(
      'If you are using **Next.js** please refer to the [next/head documentation](https://nextjs.org/docs/api-reference/next/head).'
    )
)

export default {
  chapter,
  componentDocs,
}
