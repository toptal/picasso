import PicassoBook from '~/.storybook/components/PicassoBook'

import { Form } from '../Form'

const page = PicassoBook.createPage(
  'Form',
  `Helper components for building forms.`,
  'Forms'
)

page.addComponentDocs(Form)
