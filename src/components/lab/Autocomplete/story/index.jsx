import PicassoBook from '~/.storybook/components/PicassoBook'

import { Autocomplete } from '../Autocomplete'

const page = PicassoBook.createPage(
  'Autocomplete',
  `Input with the autocomplete`,
  'Lab'
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
for this component. This you can achieve by adding this attribute:
\`autoComplete='none'
    `
  )
  .addExample('lab/Autocomplete/story/Default.example.jsx', 'Default')
  .addExample('lab/Autocomplete/story/OtherOption.example.jsx', {
    title: 'Other option',
    description: `By default Autocomplete allows any entered input value to stay after focus is removed from input,
      you can set \`showOtherOption={true}\` prop to allow also this new item to appear in the suggestions list. Also,
      you can decorate this option with the prefix text by using \`otherOptionText\` and handle selection with
      \`onOtherOptionSelect\` event handler.`
  }) // picasso-skip-visuals
  .addExample(
    'lab/Autocomplete/story/InitialSetValue.example.jsx',
    'Initially set value'
  )
  .addExample(
    'lab/Autocomplete/story/Controlled.example.jsx',
    'Controlled selection'
  )
  .addExample('lab/Autocomplete/story/FullWidth.example.jsx', 'Full width')
  .addExample('lab/Autocomplete/story/Loading.example.jsx', 'Loading')
  .addExample('lab/Autocomplete/story/Error.example.jsx', 'Error')
  .addExample('lab/Autocomplete/story/WithIcons.example.jsx', 'With Icon')
  .addExample(
    'lab/Autocomplete/story/CustomOptionRenderer.example.tsx',
    'Custom options rendering'
  )
  .addExample('lab/Autocomplete/story/DynamicOptions.example.jsx', {
    title: 'Dynamic options',
    description: `If you need to obtain the list of options dynamically from a server.
It is good practice to set debouncing and a minimum number of chars to limit the number of requests you send to the server.
Start typing "Mongolia" letter by letter to see this example in action.`
  }) // picasso-skip-visuals
  .addExample('lab/Autocomplete/story/Autofill.example.tsx', {
    title: 'Form auto filling',
    description: `This example shows how to use component inside the form with several fields
when it makes sense to have autofill enabled.
    `
  }) // picasso-skip-visuals
