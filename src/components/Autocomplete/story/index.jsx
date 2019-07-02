import PicassoBook from '~/.storybook/components/PicassoBook'

import { Autocomplete } from '../Autocomplete'

const page = PicassoBook.createPage(
  'Autocomplete',
  `TextField with the autocomplete`,
  'Forms'
)

page
  .createChapter()
  .addComponentDocs({ component: Autocomplete, name: 'Autocomplete' })
  .addTextSection(
    `Autocomplete supports all the default HTML native props, as TextField supports.`
  )
  .addExample('Autocomplete/story/Default.example.jsx', 'Default')
  .addExample('Autocomplete/story/FullWidth.example.jsx', 'Full width')
  .addExample('Autocomplete/story/Loading.example.jsx', 'Loading')
  .addExample(
    'Autocomplete/story/DynamicSuggestions.example.jsx',
    'Dynamic suggestions'
  )
