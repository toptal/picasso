import PicassoBook from '~/.storybook/components/PicassoBook'

import { Modal } from '../Modal'

import modalActionsStory from '@components/ModalActions/story'
import modalContentStory from '@components/ModalContent/story'
import modalTitleStory from '@components/ModalTitle/story'

const page = PicassoBook.createPage(
  'Modal',
  'A modal displays content that temporarily blocks interactions with the main view of a site.',
  'Overlays'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Modal, name: 'Modal' })
  .addComponentDocs(modalTitleStory.componentDocs)
  .addComponentDocs(modalContentStory.componentDocs)
  .addComponentDocs(modalActionsStory.componentDocs)

page
  .createChapter()
  .addExample(
    'Modal/story/Default.example.jsx',
    {
      title: 'Default',
      description: `
To show the 'Modal' component you should use 'useModals' hook. And if you need
any additional logic inside the 'Modal' component you should create a wrapper 
component and manage the internal state there.
`
    },
    {
      effect: async (page, makeScreenshot) => {
        await page.click('[data-testid="open"]')
        await page.waitFor(100)
        await makeScreenshot({
          isFullScreen: true
        })

        await page.click('[data-testid="close"]')
        await page.waitFor(100)
        await makeScreenshot({
          isFullScreen: true
        })

        await page.waitFor(1000)
        await makeScreenshot()
      }
    }
  )
  .addExample('Modal/story/Sizes.example.jsx', 'Sizes', {
    effect: async (page, makeScreenshot) => {
      await page.click('[data-testid="trigger-small"]')
      await page.waitFor('[data-testid="cancel"]')
      await makeScreenshot({
        isFullScreen: true
      })

      await page.click('[data-testid="cancel"]')

      await page.click('[data-testid="trigger-medium"]')
      await page.waitFor('[data-testid="cancel"]')
      await makeScreenshot({
        isFullScreen: true
      })

      await page.click('[data-testid="cancel"]')

      await page.click('[data-testid="trigger-large"]')
      await page.waitFor('[data-testid="cancel"]')
      await makeScreenshot({
        isFullScreen: true
      })
    }
  })
  .addExample('Modal/story/MaxHeight.example.jsx', 'Max Height', {
    effect: async (page, makeScreenshot) => {
      await page.click('[data-testid="trigger"]')
      await page.waitFor('[data-testid="cancel"]')
      await makeScreenshot({
        isFullScreen: true
      })
    }
  })
