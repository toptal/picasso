import { Drawer } from '../Drawer'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage(
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
        selector: '[data-testid="content"]'
      })
    }
  })
  .addExample(
    'Drawer/story/DrawerAndNotification.example.jsx',
    'With notification'
  ) // picasso-skip-visuals
