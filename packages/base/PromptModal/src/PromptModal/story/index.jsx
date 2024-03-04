import { PromptModal } from '../PromptModal'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Overlays').createPage(
  'PromptModal',
  `Predefined modal for short prompts that asks user for input.
  
  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: PromptModal, name: 'PromptModal' })

page
  .createChapter()
  .addExample(
    'PromptModal/story/Default.example.tsx',
    {
      title: 'Default',
      takeScreenshot: false,
    },
    'base/PromptModal'
  )
  .addExample(
    'PromptModal/story/Variants.example.tsx',
    {
      title: 'Variants',
      takeScreenshot: false,
    },
    'base/PromptModal'
  )
  .addExample(
    'PromptModal/story/WithInput.example.tsx',
    {
      title: 'With Input',
      takeScreenshot: false,
    },
    'base/PromptModal'
  )
  .addExample(
    'PromptModal/story/WithAutocomplete.example.tsx',
    {
      title: 'With Autocomplete',
      takeScreenshot: false,
    },
    'base/PromptModal'
  )
  .addExample(
    'PromptModal/story/ErrorHandling.example.tsx',
    {
      title: 'Error handling',
      takeScreenshot: false,
    },
    'base/PromptModal'
  )
