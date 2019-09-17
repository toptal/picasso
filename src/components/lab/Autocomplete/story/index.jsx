import PicassoBook from '~/.storybook/components/PicassoBook'

import { Autocomplete } from '../Autocomplete'

const page = PicassoBook.createPage(
  'Autocomplete',
  `Input with the autocomplete`,
  'Forms'
)

page.createTabChapter('Props').addComponentDocs({
  component: Autocomplete,
  name: 'Autocomplete',
  additionalDocs: {
    options: {
      type: {
        name: '[]',
        description: `
{\n
  text?: string\n
  value?: string\n
}
        `
      }
    }
  }
})

page
  .createChapter()
  .addTextSection(
    `
Autocomplete supports all the default HTML native props, as Input supports.

You also may want to disable standard browser autofill and autocomplete
for this component. This you can achieve by adding corresponding attributes:
\`autoComplete='nope' autofill='off'\`
    `
  )
  .addExample('lab/Autocomplete/story/Default.example.jsx', 'Default')
  .addExample('lab/Autocomplete/story/AllowAnyDisabled.example.jsx', {
    title: 'Any value disabled',
    description: `By default Autocomplete allows to enter any input value by user,
        you can set allowAny={false} prop to allow values only from the suggestion list`
  })
  .addExample(
    'lab/Autocomplete/story/InitialSelectedItem.example.jsx',
    'Initially selected item'
  )
  .addExample(
    'lab/Autocomplete/story/Controlled.example.jsx',
    'Controlled selection'
  )
  .addExample('lab/Autocomplete/story/FullWidth.example.jsx', 'Full width')
  .addExample('lab/Autocomplete/story/Loading.example.jsx', 'Loading')
  .addExample('lab/Autocomplete/story/DynamicOptions.example.jsx', {
    title: 'Dynamic options',
    description: `When you use Autocomplete with the ajax request to load options,
        you should always specify \`minLength\` prop to make less number of 
        requests to the server and to show more relevant suggestions to 
        your users.`
  }) // picasso-skip-visuals
  .addExample(
    'lab/Autocomplete/story/CustomOptionRenderer.example.tsx',
    'Custom options rendering'
  )
