import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Form',
  `Helper components for building forms.`
)

page
  .addExample('Form/story/FormField.example.jsx', {
    title: 'Form field',
    description: `
      Wrap your form controls with <Form.Field> 
      to add margins around and make it following 
      the form structure`
  })
  .addExample('Form/story/FormHint.example.jsx', {
    title: 'Form hint',
    description: `
      Add the <Form.Hint> component if you need to add
      some extra information for your form control
    `
  })
