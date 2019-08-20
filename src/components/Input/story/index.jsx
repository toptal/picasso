import PicassoBook from '~/.storybook/components/PicassoBook'

import { Input } from '../Input'

const page = PicassoBook.createPage(
  'Input',
  `Input fields are UI elements through which users submit information to the system. 
  Input fields should be clearly labeled by the topic to ensure users know exactly what is being asked of them.`,
  'Forms'
)

page
  .createChapter()
  .addComponentDocs({
    component: Input,
    name: 'Input',
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
  .addExample('Input/story/Default.example.jsx', 'Default')
  .addExample('Input/story/Disabled.example.jsx', 'Disabled')
  .addExample('Input/story/Error.example.jsx', 'Error')
  .addExample('Input/story/WithIcon.example.jsx', 'With icon')
  .addExample('Input/story/FullWidth.example.jsx', 'Full width')
  .addExample('Input/story/Multiline.example.jsx', 'Multiline | Textarea')
