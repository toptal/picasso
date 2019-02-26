import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage('Header', `A Header component`)

page
  .addExample('Header/story/Default.example.jsx', 'Default')
  .addExample('Header/story/RightContent.example.jsx', 'Right content')
