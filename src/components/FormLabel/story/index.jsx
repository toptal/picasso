import PicassoBook from '~/.storybook/components/PicassoBook'

import { FormLabel } from '../FormLabel'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter(
      'Form Label',
      `Add the <Form.Label> component if you need to add a Label to you input`
    )
    .addExample('FormLabel/story/Default.example.jsx', 'Default')
    .addExample('FormLabel/story/Error.example.jsx', 'Error')
    .addExample('FormLabel/story/Disabled.example.jsx', 'Disabled')
    .addExample('FormLabel/story/Required.example.jsx', 'Required')
)

const componentDocs = PicassoBook.createComponentDocs(FormLabel, 'Form.Label')

export default { chapter, componentDocs }
