import PicassoBook from '~/.storybook/components/PicassoBook'

import { Footer } from '../Footer'

const page = PicassoBook.createPage('Footer', `A Footer component`)

page
  .addComponentDocs(Footer)
  .addExample('Footer/story/Default.example.jsx', 'Default')
  .addExample('Footer/story/RightContent.example.jsx', 'Right content')
