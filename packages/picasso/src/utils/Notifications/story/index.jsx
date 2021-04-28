import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter(
      'Notifications stream',
      `In most cases, Notifications shouldn't be used in isolation.
The 'useNotifications' hook is providing the set of tools for
operating easily the most common notifications types, like 'info', 'error',
'warning', 'success' in a single stream of messages.`
    )
    .addTextSection('### How to use')
    .addTextSection(
      `
'useNotifications' hook is providing the list of methods to show the notifications
of the corresponding type:

\`\`\`javascript
const { showInfo, showError, showSuccess } = useNotifications()
\`\`\`

Each of them has this list of props:
    `
    )
    .addDocs([
      {
        name: 'content',
        type: 'string | ReactNode',
        description: 'The content of notification message'
      },
      {
        name: 'icon',
        type: 'ReactElement',
        description: 'The icon for the general notification'
      },
      {
        name: 'options',
        type: {
          name: 'OptionsObject',
          description: `
{\n
  preventDuplicate?: boolean\n
  onClose?: (event: React.SyntheticEvent<any>, reason: string) => void\n
  autoHideDuration?: number\n
  persist?: boolean\n
}
          `
        },
        description: 'Options of the single notification.'
      }
    ])
    .addExample('utils/Notifications/story/Default.example.tsx', {
      title: 'Default',
      effect: async (testPage, makeScreenshot) => {
        testPage.click('[data-testid="trigger"]')
        await testPage.waitFor(100)
        await makeScreenshot({
          isFullScreen: true
        })
      }
    })
    .addExample('utils/Notifications/story/Variants.example.tsx', {
      title: 'Variants',
      effect: async (testPage, makeScreenshot) => {
        await testPage.click('[data-testid="error-trigger"]')
        await testPage.waitFor(100)

        await testPage.click('[data-testid="success-trigger"]')
        await testPage.waitFor(100)

        await makeScreenshot({
          isFullScreen: true
        })
      }
    })
    .addExample('utils/Notifications/story/GeneralNotifications.example.tsx', {
      title: 'General Notifications',
      effect: async (testPage, makeScreenshot) => {
        testPage.click('[data-testid="trigger"]')
        await testPage.waitFor(100)
        await makeScreenshot({
          isFullScreen: true
        })
      }
    })
    .addExample('utils/Notifications/story/Options.example.tsx', {
      title: 'Options',
      effect: async (testPage, makeScreenshot) => {
        testPage.click('[data-testid="trigger"]')
        await testPage.waitFor(100)
        await makeScreenshot({
          isFullScreen: true
        })

        await testPage.waitFor(1000)

        // by now notification should disappear
        await makeScreenshot({
          isFullScreen: true
        })
      }
    })
    .addExample('utils/Notifications/story/Custom.example.tsx', {
      title: 'Custom'
    })
)

export default {
  chapter
}
