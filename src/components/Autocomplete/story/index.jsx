import PicassoBook from '~/.storybook/components/PicassoBook'

import { Autocomplete } from '../Autocomplete'

const page = PicassoBook.createPage(
  'Autocomplete',
  `TextField with the autocomplete`,
  'Forms'
)

page.createTabChapter('Props').addComponentDocs({
  component: Autocomplete,
  name: 'Autocomplete',
  additionalDocs: {
    options: {
      type: {
        name: '[]',
        description: '{ label: string }'
      }
    }
  }
})

page
  .createChapter()
  .addTextSection(
    `Autocomplete supports all the default HTML native props, as TextField supports.`
  )
  .addExample('Autocomplete/story/Default.example.jsx', 'Default')
  .addExample('Autocomplete/story/FullWidth.example.jsx', 'Full width')
  .addExample('Autocomplete/story/Loading.example.jsx', 'Loading')
  .addExample('Autocomplete/story/DynamicOptions.example.jsx', {
    title: 'Dynamic options',
    description: `When you use Autocomplete with the ajax request to load options,
        you should always specify \`minLength\` prop to make less number of 
        requests to the server and to show more relevant suggestions to 
        your users.`
  }) // picasso-skip-visuals
