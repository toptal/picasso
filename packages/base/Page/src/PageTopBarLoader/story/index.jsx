import { PageTopBarLoader } from '../PageTopBarLoader'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Page.TopBarLoader', 'Use as a page content container')
    .addExample(
      'PageTopBarLoader/story/Default.example.tsx',
      {
        title: 'Default',
        screenshotBreakpoints: true,
      },
      'base/Page'
    )
)

const componentDocs = PicassoBook.createComponentDocs(
  PageTopBarLoader,
  'Page.TopBarLoader'
)

export default {
  chapter,
  componentDocs,
}
