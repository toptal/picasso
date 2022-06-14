import { TagSelector } from '../TagSelector'
import PicassoBook from '~/.storybook/components/PicassoBook'
import tagSelectorLabelStory from '../../TagSelectorLabel/story'

const page = PicassoBook.section('Forms').createPage(
  'TagSelector',
  'Input that allows multiselection from a list of available options with autocomplete. Based on Autocomplete component.'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: TagSelector, name: 'TagSelector' })
  .addComponentDocs(tagSelectorLabelStory.componentDocs)

page
  .createChapter()
  .addExample('TagSelector/story/Default.example.tsx', 'Default')
  .addExample('TagSelector/story/OtherOption.example.tsx', {
    title: 'Other option',
    takeScreenshot: false,
  })
  .addExample(
    'TagSelector/story/InitialSetValue.example.tsx',
    'Initially set value'
  )
  .addExample('TagSelector/story/CustomOptionRenderer.example.tsx', {
    title: 'Custom option rendering',
    takeScreenshot: false,
  })
  .addExample('TagSelector/story/CustomLabelRenderer.example.tsx', {
    title: 'Custom label rendering',
    takeScreenshot: false,
  })
  .addExample('TagSelector/story/Loading.example.tsx', 'Loading')
  .addExample('TagSelector/story/Disabled.example.tsx', 'Disabled')
  .addExample('TagSelector/story/FullWidth.example.tsx', 'Full width')
  .addExample('TagSelector/story/Status.example.tsx', 'Status')
