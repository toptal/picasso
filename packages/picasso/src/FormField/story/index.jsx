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
    .addExample('FormField/story/Default.example.tsx', 'Default')
    .addExample('FormField/story/Sizes.example.tsx', 'Sizes')
    .addExample('FormField/story/Required.example.tsx', 'Required')
    .addExample('FormField/story/Error.example.tsx', 'Error')
    .addExample('FormField/story/Hint.example.tsx', 'Hint')
)

const componentDocs = PicassoBook.createComponentDocs(FormField, 'Form.Field')

export default {
  chapter,
  componentDocs
}
