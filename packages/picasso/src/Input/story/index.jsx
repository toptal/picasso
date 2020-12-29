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
  .addExample('Input/story/Default.example.tsx', {
    title: 'Default',
    effect: async (testPage, makeScreenshot) => {
      await testPage.hover('[data-testid="input"]')
      await makeScreenshot()

      await testPage.click('[data-testid="input"]')
      await makeScreenshot()
    }
  })
  .addExample('Input/story/Disabled.example.tsx', 'Disabled')
  .addExample('Input/story/Error.example.tsx', {
    title: 'Error',
    effect: async (testPage, makeScreenshot) => {
      await testPage.hover('[data-testid="input"]')
      await makeScreenshot()

      await testPage.click('[data-testid="input"]')
      await makeScreenshot()
    }
  })
  .addExample('Input/story/WithIcon.example.tsx', 'With icon')
  .addExample('Input/story/Sizes.example.tsx', 'Sizes')
  .addExample('Input/story/FullWidth.example.tsx', 'Full width')
  .addExample('Input/story/Multiline.example.tsx', 'Multiline | Textarea')
  .addExample(
    'Input/story/MultilineExpand.example.tsx',
    'Multiline expand and resize | Textarea'
  )
  .addExample(
    'Input/story/AutoFill.example.tsx',
    'AutoComplete defined as email'
  )
  .addExample('Input/story/WithLimit.example.tsx', 'With Limit')
  .addExample('Input/story/ResetButton.example.tsx', 'With reset button') // picasso-skip-visuals
  .addExample('Input/story/Refs.example.tsx', 'Refs') // picasso-skip-visuals
