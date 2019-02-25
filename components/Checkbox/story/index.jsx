import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage('Checkbox')

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
    name: 'indeterminate',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'If true, the component appears indeterminate. This does not set the native input element to indeterminate due to inconsistent behavior across browsers. However, we set a data-indeterminate attribute on the input'
  },
  {
    name: 'label',
    type: 'string',
    description: 'Checkbox label'
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
  }
]

page
  .addDocs(docs)
  .addExample('Checkbox/story/Uncontrolled.example.jsx', {
    title: 'Uncontrolled',
    description: 'Can control its state by itself'
  })
  .addExample('Checkbox/story/Controlled.example.jsx', {
    title: 'Controlled',
    description: 'Stateless checkbox, state should be controlled using prop'
  })
  .addExample('Checkbox/story/Disabled.example.jsx', 'Disabled')
  .addExample('Checkbox/story/Indeterminate.example.jsx', 'Indeterminate')
