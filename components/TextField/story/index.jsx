import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'TextField',
  `Input fields are UI elements through which users submit information to the system. 
  Input fields should be clearly labeled by the topic to ensure users know exactly what is being asked of them.`
)

const docs = [
  {
    name: 'disabled',
    type: 'boolean',
    description: 'If true, the switch will be disabled'
  },
  {
    name: 'name',
    type: 'string',
    description: 'Name attribute of the input element'
  },
  {
    name: 'error',
    type: 'boolean',
    description: 'Indicate whether TextField is in error state'
  },
  {
    name: 'label',
    type: 'string',
    description: 'TextField label'
  },
  {
    name: 'iconPosition',
    type: 'enum',
    defaultValue: 'end',
    description:
      'Whether icon should be placed at the begining or end of TextField',
    enums: ['start', 'end']
  },
  {
    name: 'Icon',
    type: 'node',
    description: 'Specify icon which should be rendered inside TextField'
  },
  {
    name: 'multiline',
    type: 'boolean',
    description: 'Whether TextField should be rendered as TextArea or not'
  },
  {
    name: 'rows',
    type: 'number',
    description: 'Specify rows amount for TextArea'
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
    type: 'string',
    description: 'The value of the component'
  },
  {
    name: 'type',
    type: 'string',
    description:
      'Type attribute of the Input element. It should be a valid HTML5 input type'
  }
]

page
  .addDocs(docs)
  .addExample('TextField/story/Default.example.jsx', 'Default')
  .addExample('TextField/story/WithIcon.example.jsx', 'With icon')
  .addExample('TextField/story/Error.example.jsx', 'Error')
  .addExample('TextField/story/Multiline.example.jsx', 'Multiline | Textarea')
