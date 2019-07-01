import PicassoBook from '~/.storybook/components/PicassoBook'

import { Autocomplete } from '../Autocomplete'

const page = PicassoBook.createPage(
  'Autocomplete',
  `TextField with the autocomplete`,
  'Forms'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Autocomplete, name: 'Autocomplete' })

page
  .createChapter()
  .addExample('Autocomplete/story/Default.example.jsx', 'Default')
  .addExample('Autocomplete/story/FullWidth.example.jsx', 'Full width')
