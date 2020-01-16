import FormInput from '../FormInput'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage('FormInput', 'Form input', 'Picasso Forms')

page
  .createTabChapter('Props')
  .addComponentDocs({ component: FormInput, name: 'FormInput' })

page
  .createChapter()
  .addExample('FormInput/story/Default.example.jsx', 'Default')
