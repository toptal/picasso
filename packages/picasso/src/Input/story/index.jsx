import { Input } from '../Input'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'Input',
  `Input fields are UI elements through which users submit information to the system.
    Input fields should be clearly labeled by the topic to ensure users know exactly what is being asked of them.`
)

page
  .createChapter()
  .addComponentDocs({
    component: Input,
    name: 'Input',
    additionalDocs: {
      iconPosition: {
        type: 'enum',
        enums: ['start', 'end']
      }
    }
  })
  .addExample('Input/story/Default.example.jsx', {
    title: 'Default',
    effect: async (testPage, makeScreenshot) => {
      await testPage.hover('[data-testid="input"]')
      await makeScreenshot()

      await testPage.click('[data-testid="input"]')
      await makeScreenshot()
    }
  })
  .addExample('Input/story/Disabled.example.jsx', 'Disabled')
  .addExample('Input/story/Error.example.jsx', {
    title: 'Error',
    effect: async (testPage, makeScreenshot) => {
      await testPage.hover('[data-testid="input"]')
      await makeScreenshot()

      await testPage.click('[data-testid="input"]')
      await makeScreenshot()
    }
  })
  .addExample('Input/story/WithIcon.example.jsx', 'With icon')
  .addExample('Input/story/Sizes.example.jsx', 'Sizes')
  .addExample('Input/story/FullWidth.example.jsx', 'Full width')
  .addExample('Input/story/Multiline.example.jsx', 'Multiline | Textarea')
  .addExample(
    'Input/story/MultilineExpand.example.jsx',
    'Multiline expand and resize | Textarea'
  )
  .addExample(
    'Input/story/AutoFill.example.jsx',
    'AutoComplete defined as email'
  )
  .addExample('Input/story/WithLimit.example.tsx', 'With Limit')
  .addExample('Input/story/ResetButton.example.tsx', 'With reset button') // picasso-skip-visuals
  .addExample('Input/story/Refs.example.tsx', 'Refs') // picasso-skip-visuals
