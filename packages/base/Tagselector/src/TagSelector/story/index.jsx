import { TagSelector } from '../TagSelector'
import PicassoBook from '~/.storybook/components/PicassoBook'
import tagSelectorLabelStory from '../../TagSelectorLabel/story'

const page = PicassoBook.section('Forms').createPage(
  'TagSelector',
  `Input that allows multiselection from a list of available options with autocomplete. Based on Autocomplete component.

  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: TagSelector, name: 'TagSelector' })
  .addComponentDocs(tagSelectorLabelStory.componentDocs)

page
  .createChapter()
  .addExample(
    'TagSelector/story/Default.example.tsx',
    'Default',
    'base/Tagselector'
  )
  .addExample(
    'TagSelector/story/OtherOption.example.tsx',
    {
      title: 'Other option',
      takeScreenshot: false,
    },
    'base/Tagselector'
  )
  .addExample(
    'TagSelector/story/OtherOptionSubmissionOnEnter.example.tsx',
    {
      title: 'Other option submission on Enter',
      description:
        'Press Enter to submit other option value. Combine it with empty `options` and `noOptionsText` properties to hide the options dropdown and achieve regular input behavior and look.',
      takeScreenshot: false,
    },
    'base/Tagselector'
  )
  .addExample(
    'TagSelector/story/InitialSetValue.example.tsx',
    'Initially set value',
    'base/Tagselector'
  )
  .addExample(
    'TagSelector/story/KeepOpen.example.tsx',
    {
      title: 'With closeOnSelect disabled',
      description:
        'Disabling closeOnSelect can be useful when the user always have to select multiple values at the same time',
      takeScreenshot: false,
    },
    'base/Tagselector'
  )
  .addExample(
    'TagSelector/story/CustomOptionRenderer.example.tsx',
    {
      title: 'Custom option rendering',
      takeScreenshot: false,
    },
    'base/Tagselector'
  )
  .addExample(
    'TagSelector/story/CustomLabelRenderer.example.tsx',
    {
      title: 'Custom label rendering',
      takeScreenshot: false,
    },
    'base/Tagselector'
  )
  .addExample(
    'TagSelector/story/Loading.example.tsx',
    'Loading',
    'base/Tagselector'
  )
  .addExample(
    'TagSelector/story/Disabled.example.tsx',
    'Disabled',
    'base/Tagselector'
  )
  .addExample(
    'TagSelector/story/FullWidth.example.tsx',
    'Full width',
    'base/Tagselector'
  )
  .addExample(
    'TagSelector/story/Status.example.tsx',
    'Status',
    'base/Tagselector'
  )
  .addExample(
    'TagSelector/story/Sizes.example.tsx',
    'Sizes',
    'base/Tagselector'
  )
