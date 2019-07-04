import PicassoBook from '~/.storybook/components/PicassoBook'

import { TextField } from '../TextField'

const page = PicassoBook.createPage(
  'TextField',
  `Input fields are UI elements through which users submit information to the system. 
  Input fields should be clearly labeled by the topic to ensure users know exactly what is being asked of them.`,
  'Forms'
)

page
  .createChapter()
  .addComponentDocs({
    component: TextField,
    name: 'TextField',
    additionalDocs: {
      fullWidth: {
        name: 'fullWidth [DEPRECATED]'
      },
      iconPosition: {
        type: 'enum',
        enums: ['start', 'end']
      }
    }
  })
  .addExample('TextField/story/Default.example.jsx', 'Default')
  .addExample('TextField/story/Disabled.example.jsx', 'Disabled')
  .addExample('TextField/story/Error.example.jsx', 'Error')
  .addExample('TextField/story/WithIcon.example.jsx', 'With icon')
  .addExample('TextField/story/FullWidth.example.jsx', 'Full width')
  .addExample('TextField/story/Multiline.example.jsx', 'Multiline | Textarea')
