import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter(
      'Notifications stream (Snackbars)',
      `In most cases, Notifications shouldn't be used in isolation.
The 'useNotifications' hook is providing the set of tools for
operating easily the most common notifications types, like 'info', 'error',
'warning', 'success' in a single stream of messages.`
    )
    .addTextSection(`### useNotifications`)
    .addDocs([
      {
        name: 'notificationsPosition',
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
    .addTextSection(
      `
'useNotifications' hook is providing the list of methods to show the notifications
of the corresponding type:

- showError
- showInformation
- showSuccess
- showWarning

Each of them has this list of props:
    `
    )
    .addDocs([
      {
        name: 'text',
        type: 'string',
        description: 'The error message'
      },
      {
        name: 'options',
        type: {
          name: 'OptionsObject',
          description: `
{\n
  persist?: boolean\n
  preventDuplicate?: boolean\n
  onClose?: (event: React.SyntheticEvent<any>, reason: string) => void\n
  autoHideDuration?: number\n
}
          `
        },
        description: 'Options of the single notification.'
      }
    ])
)

export default {
  chapter
}
