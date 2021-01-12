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
      await testPage.hover('[data-testid="ellipsed-text"]')
      await testPage.waitFor(200)
      await makeScreenshot()

      await testPage.hover('[data-testid="ellipsed-text-dynamic-width"]')
      await testPage.waitFor(200)
      await makeScreenshot()
    }
  })
  .addExample('TypographyOverflow/story/CheckboxLabel.example.tsx', {
    title: 'Checkbox label',
    effect: async (testPage, makeScreenshot) => {
      await testPage.hover('[data-testid="ellipsed-text"]')
      await testPage.waitFor(600)
      await makeScreenshot()
    }
  })
  .addExample('TypographyOverflow/story/CustomTooltip.example.tsx', {
    title: 'Custom tooltip content',
    effect: async (testPage, makeScreenshot) => {
      await testPage.hover('[data-testid="ellipsed-text"]')
      await testPage.waitFor(200)
      await makeScreenshot()
    }
  })
  .addExample('TypographyOverflow/story/TooltipVariants.example.tsx', {
    title: 'Light tooltip background',
    effect: async (testPage, makeScreenshot) => {
      await testPage.hover('[data-testid="ellipsed-text-dark"]')
      await testPage.waitFor(200)
      await makeScreenshot()

      await testPage.hover('[data-testid="ellipsed-text-light"]')
      await testPage.waitFor(200)
      await makeScreenshot()
    }
  })
  .addExample('TypographyOverflow/story/Delay.example.tsx', {
    title: 'Delay',
    effect: async (testPage, makeScreenshot) => {
      await testPage.hover('[data-testid="default-delay-tooltip"]')
      await testPage.waitFor(200)
      await makeScreenshot()

      await testPage.hover('[data-testid="long-delay-tooltip"]')
      await testPage.waitFor(500)
      await makeScreenshot()
    }
  })
