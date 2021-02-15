import { Drawer } from '../Drawer'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Lab').createPage(
  'Drawer',
  'Allows rendering a sidebar with custom content'
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
  .addExample('Drawer/story/Widths.example.tsx', {
    title: 'Width',
    effect: async (testPage, makeScreenshot) => {
      await testPage.click('[data-testid="show-regular"]')
      await testPage.waitFor('[data-testid="content"]', {
        visible: true
      })
      await makeScreenshot({
        isFullScreen: true,
        selector: '[data-testid="content"]'
      })
      await testPage.click('[data-testid="show-regular"]')
      await testPage.waitFor('[data-testid="content"]', {
        hidden: true
      })
      await testPage.click('[data-testid="show-wide"]')
      await testPage.waitFor('[data-testid="content"]', {
        visible: true
      })
      await makeScreenshot({
        isFullScreen: true,
        selector: '[data-testid="content"]'
      })
    }
  })
  .addExample(
    'Drawer/story/DrawerAndNotification.example.tsx',
    'With notification'
  ) // picasso-skip-visuals
