import PicassoBook from '~/.storybook/components/PicassoBook'

import { TagSelector } from '../TagSelector'

const page = PicassoBook.createPage(
  'TagSelector',
  'Input that allows multiselection from a list of available options with autocomplete. You can add new options too.',
  'Lab'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: TagSelector, name: 'TagSelector' })

page
  .createChapter()
  .addExample('lab/TagSelector/story/Default.example.jsx', 'Default')
  .addExample(
    'lab/TagSelector/story/SingleDefaultSelection.example.jsx',
    'Single Default selection'
  )
  .addExample(
    'lab/TagSelector/story/MultilineDefaultSelection.example.jsx',
    'Multiline Default selection'
  )
  .addExample('lab/TagSelector/story/Loading.example.jsx', 'Loading')
