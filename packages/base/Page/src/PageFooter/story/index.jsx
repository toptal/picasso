import { PageFooter } from '../PageFooter'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(PageFooter, 'Page.Footer')

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Page.Footer', 'A Footer component')
    .addExample(
      'PageFooter/story/Default.example.tsx',
      {
        title: 'Default',
        screenshotBreakpoints: true,
      },
      'base/Page'
    )
    .addExample(
      'PageFooter/story/RightContent.example.tsx',
      {
        title: 'Right content',
        screenshotBreakpoints: true,
      },
      'base/Page'
    )
    .addExample(
      'PageFooter/story/CopyrightContent.example.tsx',
      {
        title: 'Copyright content',
        screenshotBreakpoints: true,
      },
      'base/Page'
    )
)

export default {
  componentDocs,
  chapter,
}
