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
    .addTextSection(`### useNotifications`)
    .addDocs([
      {
        name: 'position',
        type: {
          name: 'SnackbarOrigin',
          description: `
{\n
  horizontal: 'left' | 'center' | 'right'\n
  vertical: 'top' | 'bottom'\n
}
          `
        },
        description: 'The position of the notification messages to appear.'
      }
    ])
    .addExample('utils/Notifications/story/Default.example.jsx', 'Default')
    .addExample('utils/Notifications/story/Position.example.jsx', 'Position')
    .addTextSection(`### How to use`)
    .addTextSection(
      `
'useNotifications' hook is providing the list of methods to show the notifications
of the corresponding type:

\`\`\`javascript
const { showError, showInformation, showSuccess, showWarning } = useNotifications()
\`\`\`

Each of them has this list of props:
    `
    )
    .addDocs([
      {
        name: 'text',
        type: 'string',
        description: 'The text of notification message'
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
  dismissible?: boolean\n
}
          `
        },
        description: 'Options of the single notification.'
      }
    ])
    .addExample('utils/Notifications/story/Options.example.jsx', 'Options')
    .addExample('utils/Notifications/story/Persistent.example.jsx', {
      title: 'Persistent',
      description:
        'If you need to wait until the user will close the notification message manually.'
    })
    .addExample('utils/Notifications/story/CustomActions.example.jsx', {
      title: 'Custom Actions',
      description:
        'If you need to have custom actions inside the notification which can close the notification.'
    })
)

export default {
  chapter
}
