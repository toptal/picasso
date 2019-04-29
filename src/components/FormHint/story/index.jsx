import PicassoBook from '~/.storybook/components/PicassoBook'

import { FormHint } from '../FormHint'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter(
      'Form Hint',
      `Add the <Form.Hint> component if you need to add
    some extra information for your form control`
    )
    .addExample('FormHint/story/FormHint.example.jsx', 'Form hint')
)

const componentDocs = PicassoBook.createComponentDocs(FormHint, 'Form.Hint')

export default { chapter, componentDocs }
