import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Radio',
  `Radio buttons are best used when users need to select a single option from a set of unfamiliar choices. 
  Radio buttons surface all the options and allow the user to compare choices before making a selection.`
)

const docs = [
  {
    name: 'checked',
    type: 'boolean',
    description: 'If true, the component is checked'
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'If true, the switch will be disabled'
  },
  {
    name: 'label',
    type: 'string',
    description: 'Radio label'
  },
  {
    name: 'onChange',
    type: 'function',
    description: `
      Callback fired when the state is changed.
      <br />
      <br />
      <b>Signature:</b><br />
      function(event: object, checked: boolean) => void<br />
      event: The event source of the callback. You can pull out the new value by accessing event.target.checked.<br />
      checked: The checked value of the switch
    `
  },
  {
    name: 'value',
    type: 'string | number | boolean',
    description: 'The value of the component'
  }
]

page
  .addDocs(docs)
  .addExample('Radio/story/Default.example.jsx', 'Default')
  .addExample('Radio/story/Types.example.jsx', 'Types')
  .addExample('Radio/story/Disabled.example.jsx', 'Disabled')
  .addExample(
    'Radio/story/RadioGroupVertical.example.jsx',
    'Radio group vertical'
  )
  .addExample(
    'Radio/story/RadioGroupHorizontal.example.jsx',
    'Radio group horizontal'
  )
