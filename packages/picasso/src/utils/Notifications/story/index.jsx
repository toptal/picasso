import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(
  page =>
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
      .addExample('utils/Notifications/story/Default.example.tsx', 'Default') // picasso-skip-visuals
      .addExample('utils/Notifications/story/Variants.example.tsx', 'Variants') // picasso-skip-visuals
      .addExample(
        'utils/Notifications/story/GeneralNotifications.example.tsx',
        'General Notifications'
      ) // picasso-skip-visuals
      .addExample('utils/Notifications/story/Options.example.tsx', 'Options') // picasso-skip-visuals
      .addTextSection(
        `
Additionally for custom notifications 'useNotifications' hook is providing the special methods:

\`\`\`javascript
const { showCustomNotification, closeNotification } = useNotifications()
\`\`\`

With the list of props:
      `
      )
      .addDocs([
        {
          name: 'Content',
          type: 'ReactElement',
          description: 'The custom notification component'
        },
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
          description: 'Position of the single notification.'
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
      .addExample('utils/Notifications/story/Custom.example.tsx', 'Custom') // picasso-skip-visuals
)

export default {
  chapter
}
