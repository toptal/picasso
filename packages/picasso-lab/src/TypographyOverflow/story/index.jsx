import { TypographyOverflow } from '../TypographyOverflow'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage(
  'TypographyOverflow',
  'Show tooltip when typography overflows'
)

page.createTabChapter('Props').addComponentDocs({
  component: TypographyOverflow,
  name: 'TypographyOverflow'
})

page
  .createChapter()
  .addExample('TypographyOverflow/story/Default.example.tsx', {
    title: 'Default',
    effect: async (testPage, makeScreenshot) => {
      /**
       * TODO: Revert to testPage.hover once the issue below is fixed
       * https://github.com/puppeteer/puppeteer/issues/4820
       */
      // When ellipsed text is hovered then tooltip should appear
      await testPage.click('[data-testid="ellipsed-text"]')
      await testPage.waitFor(600)
      await makeScreenshot()
    }
  })
  .addExample('TypographyOverflow/story/CheckboxLabel.example.tsx', {
    title: 'Checkbox label',
    effect: async (testPage, makeScreenshot) => {
      /**
       * TODO: Revert to testPage.hover once the issue below is fixed
       * https://github.com/puppeteer/puppeteer/issues/4820
       */
      // When ellipsed checkbox's label is hovered then tooltip should appear
      await testPage.click('[data-testid="ellipsed-text"]')
      await testPage.waitFor(600)
      await makeScreenshot()
    }
  })
  .addExample('TypographyOverflow/story/CustomTooltip.example.tsx', {
    title: 'Custom tooltip content',
    effect: async (testPage, makeScreenshot) => {
      /**
       * TODO: Revert to testPage.hover once the issue below is fixed
       * https://github.com/puppeteer/puppeteer/issues/4820
       */
      // When ellipsed checkbox's label is hovered then tooltip should appear
      await testPage.click('[data-testid="ellipsed-text"]')
      await testPage.waitFor(600)
      await makeScreenshot()
    }
  })
  .addExample('TypographyOverflow/story/WithDelay.example.tsx', {
    title: 'With delay',
    effect: async (testPage, makeScreenshot) => {
      /**
       * TODO: Revert to testPage.hover once the issue below is fixed
       * https://github.com/puppeteer/puppeteer/issues/4820
       */
      // When ellipsed text is hovered then tooltip should appear
      await testPage.click('[data-testid="default-delay-tooltip"]')
      await testPage.waitFor(300)
      await makeScreenshot()

      await testPage.click('[data-testid="long-delay-tooltip"]')
      await testPage.waitFor(500)
      await makeScreenshot()
    }
  })
