import PicassoBook from '~/.storybook/components/PicassoBook'

import { Header } from '../Header'

const page = PicassoBook.createPage('Header', `A Header component`)

page
  .addComponentDocs(Header)
  .addExample('Header/story/Default.example.jsx', 'Default')
  .addExample('Header/story/RightContent.example.jsx', 'Right content')
