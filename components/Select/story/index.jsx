import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Select',
  `Selects are interactive elements that prompt users to make selections 
  or take actions from a set of list of available options.`
)

const docs = [
  {
    name: 'disabled',
    type: 'boolean',
    description: 'If true, the switch will be disabled'
  },
  {
    name: 'id',
    type: 'string',
    description: 'Component id'
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Take the full width of a container'
  },
  {
    name: 'label',
    type: 'string',
    description: 'Shrinking label'
  },
  {
    name: 'placeholder',
    type: 'string',
    description: 'Placeholder option which is selected by default'
  },
  {
    name: 'native',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Whether Select should be rendered as native HTML &lt;select /&gt;'
  },
  {
    name: 'onChange',
    type: 'function',
    description: `
      Callback fired when the state is changed.
      <br />
      <br />
      <b>Signature:</b>
      function(event: object, child: node) => void
      event: The event source of the callback.
      child: Child node which was selected by user    
    `
  },
  {
    name: 'options',
    type: 'array',
    description: `
      [<br/>
      &nbsp;&nbsp;{ value: '1', text: 'Option 1' },<br/>
      &nbsp;&nbsp;{ value: '2', text: 'Option 2' },<br/>
      &nbsp;&nbsp;{ value: '3', text: 'Option 3' },<br/>
      &nbsp;&nbsp;{ value: '4', text: 'Option 4' }<br/>
      ]
    `
  },
  {
    name: 'value',
    type: 'string | number',
    description: 'Selected value'
  },
  {
    name: 'variant',
    type: 'enum',
    defaultValue: 'outlined',
    description: 'The variant to use',
    enums: ['standard', 'outlined']
  }
]

page
  .addDocs(docs)
  .addExample('Select/story/Default.example.jsx', 'Default')
  .addExample('Select/story/Types.example.jsx', 'Types')
  .addExample('Select/story/WithLabel.example.jsx', 'With label')
  .addExample('Select/story/Disabled.example.jsx', 'Disabled')
  .addExample('Select/story/FullWidth.example.jsx', 'Full width')
  .addExample('Select/story/ChosenOption.example.jsx', {
    title: 'Chosen option',
    description:
      'Renders Select component with already chosen one of the options'
  })
  .addExample('Select/story/CustomOptions.example.jsx', {
    title: 'Custom options',
    description:
      'Options of the Select component could be not only text, but custom components'
  })
