import { Modal } from '../Modal'
import modalActionsStory from '../../ModalActions/story'
import modalContentStory from '../../ModalContent/story'
import modalTitleStory from '../../ModalTitle/story'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Overlays').createPage(
  'Modal',
  'A modal displays content that temporarily blocks interactions with the main view of a site.'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Modal, name: 'Modal' })
  .addComponentDocs(modalTitleStory.componentDocs)
  .addComponentDocs(modalContentStory.componentDocs)
  .addComponentDocs(modalActionsStory.componentDocs)

page
  .createChapter()
  .addExample('Modal/story/Default.example.tsx', {
    title: 'Default',
    description: `
To show the 'Modal' component you should use 'useModal' hook. And if you need
any additional logic inside the 'Modal' component you should create a wrapper 
component and manage the internal state there.
`,
    effect: async (testPage, makeScreenshot) => {
      await testPage.click('[data-testid="open"]')
      await testPage.waitFor(100)
      await makeScreenshot({
        isFullScreen: true
      })

      await testPage.click('[data-testid="close"]')
      await testPage.waitFor(100)
      await makeScreenshot({
        isFullScreen: true
      })

      await testPage.waitFor(1000)
      await makeScreenshot()
    }
  })
  .addExample('Modal/story/Sizes.example.tsx', {
    title: 'Sizes',
    effect: async (testPage, makeScreenshot) => {
      await testPage.click('[data-testid="trigger-small"]')
      await testPage.waitFor('[data-testid="cancel"]')
      await makeScreenshot({
        isFullScreen: true
      })

      await testPage.click('[data-testid="cancel"]')

      await testPage.click('[data-testid="trigger-medium"]')
      await testPage.waitFor('[data-testid="cancel"]')
      await makeScreenshot({
        isFullScreen: true
      })

      await testPage.click('[data-testid="cancel"]')

      await testPage.click('[data-testid="trigger-large"]')
      await testPage.waitFor('[data-testid="cancel"]')
      await makeScreenshot({
        isFullScreen: true
      })

      await testPage.click('[data-testid="cancel"]')

      await testPage.click('[data-testid="trigger-full-screen"]')
      await testPage.waitFor('[data-testid="cancel"]')
      await makeScreenshot({
        isFullScreen: true
      })
    }
  })
  .addExample('Modal/story/MaxHeight.example.tsx', {
    title: 'Max Height',
    effect: async (testPage, makeScreenshot) => {
      await testPage.click('[data-testid="trigger"]')
      await testPage.waitFor('[data-testid="cancel"]')
      await makeScreenshot({
        isFullScreen: true
      })
    }
  })
  .addExample('Modal/story/Tooltips.example.tsx', {
    // TODO title should be 1-2 words, title -> descripion
    title: 'Two tooltips on the page'
  }) // picasso-skip-visuals
  .addExample('Modal/story/Alignment.example.tsx', {
    title: 'Alignment',
    description: 'Demonstrate how `align` prop works',
    effect: async (testPage, makeScreenshot) => {
      await testPage.click('[data-testid="align-top-open"]')
      await testPage.waitFor(100)
      await makeScreenshot({
        isFullScreen: true
      })
    }
  })
