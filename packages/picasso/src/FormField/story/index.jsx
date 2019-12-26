import { FormField } from '../FormField'

import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter(
      'Form Field',
      `Wrap your form controls with <Form.Field> 
    to add margins around and make it following 
    the form structure`
    )
    .addExample('FormField/story/FormField.example.jsx', 'Form field')
)

const componentDocs = PicassoBook.createComponentDocs(FormField, 'Form.Field')

export default {
  chapter,
  componentDocs
}
