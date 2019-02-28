import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage('Footer', `A Footer component`)

const docs = [
  {
    name: 'rightContent',
    type: 'node',
    description:
      'Pass custom components that you want to render on the right side of the footer'
  }
]

page
  .addDocs(docs)
  .addExample('Footer/story/Default.example.jsx', 'Default')
  .addExample('Footer/story/RightContent.example.jsx', 'Right content')
