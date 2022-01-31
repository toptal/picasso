import { Drawer } from '../Drawer'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Drawer',
  `
    Allows rendering a sidebar with custom content
    
    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/22ba178c-50b8-4eb3-9eeb-e527fbed15e5?collectionLayerId=e9a36438-d8c9-42a4-94bc-ea134fd2e2a1&mode=design&present=true'
    )}
  `
)

page.createTabChapter('Props').addComponentDocs({
  component: Drawer,
  name: 'Drawer'
})

page
  .createChapter()
  .addExample('Drawer/story/Default.example.tsx', {
    title: 'Default',
    effect: async (testPage, makeScreenshot) => {
      await testPage.click('[data-testid="trigger"]')

      await makeScreenshot({
        isFullScreen: true,
        selector: '[data-testid="content"]'
      })
    }
  })
  .addExample('Drawer/story/WithoutTitle.example.tsx', {
    title: 'Without Title',
    effect: async (testPage, makeScreenshot) => {
      await testPage.click('[data-testid="trigger"]')

      await makeScreenshot({
        isFullScreen: true
      })
    }
  })
  .addExample('Drawer/story/CustomTitle.example.tsx', {
    title: 'Custom Title',
    effect: async (testPage, makeScreenshot) => {
      await testPage.click('[data-testid="trigger"]')

      await makeScreenshot({
        isFullScreen: true
      })
    }
  })
  .addExample('Drawer/story/Widths.example.tsx', {
    title: 'Width',
    effect: async (testPage, makeScreenshot) => {
      const types = ['narrow', 'regular', 'medium', 'wide', 'ultra-wide']
      const contentSelector = '[data-testid="content"]'

      for (const type in types) {
        const buttonSelector = `[data-testid="show-${types[type]}"]`

        await testPage.click(buttonSelector)
        await testPage.waitFor(contentSelector, {
          visible: true
        })
        await makeScreenshot({
          isFullScreen: true,
          selector: contentSelector
        })
        await testPage.click('[role="presentation"] button')
        await testPage.waitFor(contentSelector, {
          hidden: true
        })
      }
    }
  })
  .addExample(
    'Drawer/story/DrawerAndNotification.example.tsx',
    'With notification'
  ) // picasso-skip-visuals
