import Form from '../Form'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage('Form', 'Form input', 'Picasso Forms')

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Form, name: 'Form' })

page.createChapter().addExample('Form/story/Default.example.tsx', 'Default')
