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
  // TODO: this example should be replaced with cypress test
  // https://toptal-core.atlassian.net/browse/FX-1219
  .addExample('Modal/story/Tooltips.example.tsx', {
    title: 'Two tooltips on the page',
    effect: async (testPage, makeScreenshot) => {
      // Remove carrent symbol
      const hideInputCaretStyle = `
        input {
          caret-color: transparent !important;
        }
      `

      await testPage.addStyleTag({ content: hideInputCaretStyle })

      // open modal
      await testPage.click('[data-testid="trigger"]')
      await testPage.waitFor('[data-testid="datepicker"]')

      // clear input value
      await testPage.evaluate(() => {
        const input = document.querySelector('[data-testid="datepicker"]')

        input.value = ''
      })

      const input = await testPage.$('[data-testid="datepicker"]')

      // open calendar
      await input.click()

      await testPage.waitFor('[data-testid="calendar"]')

      const buttons = await testPage.$$('[data-testid="calendar"] button')
      const button3rdNovember = buttons[10]

      await button3rdNovember.click()

      await makeScreenshot({
        isFullScreen: true
      })
    }
  })
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
