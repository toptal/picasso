import { PageHelmet } from '../PageHelmet'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(PageHelmet, 'Page.Helmet')

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Page.Helmet', 'Manipulate with document head')
    .addTextSection(
      `
      This component is a wrapper around react-helmet-async, you can use Page.Helmet as a drop-in replacement

      <Page.Helmet>
        <title>My custom title</title>
      </Page.Helmet>
    `
    )
    .addTextSection(
      'ℹ️ You must wrap your application with `<PicassoProvider>` component to make `<Page.Helmet>` work properly.'
    )
    .addTextSection(
      'Please refer to the original [react-helmet-async documentation](https://www.npmjs.com/package/react-helmet-async).'
    )
    .addTextSection(
      'If you are using **Next.js** please disable usage of `react-helmet-async` by passing `disableHelmet` prop to the `<PicassoProvider>`. ' +
        'After that, refer to the [next/head documentation](https://nextjs.org/docs/api-reference/next/head).'
    )
)

export default {
  chapter,
  componentDocs,
}
