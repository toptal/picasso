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
        description: 'The content of notification message',
      },
      {
        name: 'icon',
        type: 'ReactElement',
        description: 'The icon for the general notification',
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
          `,
        },
        description: 'Options of the single notification.',
      },
    ])
    .addExample(
      'use-notification/story/Default.example.tsx',
      {
        title: 'Default',
        takeScreenshot: false,
      },
      'base/Notification'
    )
    .addExample(
      'use-notification/story/Variants.example.tsx',
      {
        title: 'Variants',
        takeScreenshot: false,
      },
      'base/Notification'
    )
    .addExample(
      'use-notification/story/GeneralNotifications.example.tsx',
      {
        title: 'General Notifications',
        takeScreenshot: false,
      },
      'base/Notification'
    )
    .addExample(
      'use-notification/story/Options.example.tsx',
      {
        title: 'Options',
        takeScreenshot: false,
      },
      'base/Notification'
    )
    .addExample(
      'use-notification/story/Custom.example.tsx',
      {
        title: 'Custom',
        takeScreenshot: false,
      },
      'base/Notification'
    )
    .addExample(
      'use-notification/story/CustomPosition.example.tsx',
      {
        title: 'Custom Position',
        takeScreenshot: false,
      },
      'base/Notification'
    )
    .addExample(
      'use-notification/story/MaxNotifications.example.tsx',
      {
        title: 'MaxNotifications',
        takeScreenshot: false,
      },
      'base/Notification'
    )
)

export default {
  chapter,
}
