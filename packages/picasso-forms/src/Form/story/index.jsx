import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage('Form', 'Form', 'Picasso Forms')

page
  .createChapter()
  .addTextSection(
    `
Form is a wrapper for 'react-final-form' Form component. It also
provides inside all the necessary input components types.
    `
  )
  .addExample(
    'Form/story/Default.example.tsx',
    {
      title: 'Default',
      description: `
A general look of the form includes the examples of all the input
types supported by picasso-forms.
`
    },
    'picasso-form'
  )
  .addExample(
    'Form/story/CustomValidator.example.tsx',
    {
      title: 'Custom validator',
      description: `
We have a 'required' validator included by default to each input type,
however, you may need custom validators for more complex types of fields.
`
    },
    'picasso-form'
  ) // picasso-skip-visuals
  .addExample(
    'Form/story/BackendCommunication.example.tsx',
    {
      title: 'Backend communication',
      description: `
The form usually need to send data to backend, so we need to have
backend communication and display the process of submission and
the results. The form-level results are represented by notifications.
`
    },
    'picasso-form'
  ) // picasso-skip-visuals
