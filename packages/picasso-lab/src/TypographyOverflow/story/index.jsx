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
      // When ellipsed text is hovered then tooltip should appear
      await testPage.hover('[data-testid="ellipsed-text"]')
      await testPage.waitFor(100)
      await makeScreenshot()
    }
  })
  .addExample('TypographyOverflow/story/CheckboxLabel.example.tsx', {
    title: 'Checkbox label',
    effect: async (testPage, makeScreenshot) => {
      // When ellipsed checkbox's label is hovered then tooltip should appear
      await testPage.hover('[data-testid="ellipsed-text"]')
      await testPage.waitFor(100)
      await makeScreenshot()
    }
  })
