import { PromptModal } from '../PromptModal'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Overlays').createPage(
  'PromptModal',
  'Predefined modal for short prompts that asks user for input.'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: PromptModal, name: 'PromptModal' })

page
  .createChapter()
  .addExample('PromptModal/story/Default.example.tsx', 'Default') // picasso-skip-visuals
  .addExample('PromptModal/story/Variants.example.tsx', 'Variants') // picasso-skip-visuals
  .addExample('PromptModal/story/WithInput.example.tsx', 'With Input') // picasso-skip-visuals
  .addExample(
    'PromptModal/story/WithAutocomplete.example.tsx',
    'With Autocomplete'
  ) // picasso-skip-visuals
  .addExample('PromptModal/story/ErrorHandling.example.tsx', 'Error handling') // picasso-skip-visuals
