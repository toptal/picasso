import PicassoBook from '~/.storybook/components/PicassoBook'

import { FormHint } from '../FormHint'

const page = PicassoBook.lookupPage('Form')

page
  .createChapter(
    'Form Hint',
    `Add the <Form.Hint> component if you need to add
    some extra information for your form control`
  )
  .addComponentDocs(FormHint)
  .addExample('FormHint/story/FormHint.example.jsx', 'Form hint')
