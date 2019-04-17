import PicassoBook from '.storybook/components/PicassoBook'

import { FormField } from '../FormField'

const page = PicassoBook.lookupPage('Form')

page
  .createChapter(
    'Form Field',
    `Wrap your form controls with <Form.Field> 
    to add margins around and make it following 
    the form structure`
  )
  .addComponentDocs(FormField)
  .addExample('FormField/story/FormField.example.jsx', 'Form field')
