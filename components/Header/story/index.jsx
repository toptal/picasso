import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage('Header', `A Header component`)

const docs = [
  {
    name: 'title',
    type: 'string',
    description: 'Title which is displayed along the Logo'
  },
  {
    name: 'rightContent',
    type: 'node',
    description:
      'Pass custom components that you want to render on the right side of the header'
  }
]

page
  .addDocs(docs)
  .addExample('Header/story/Default.example.jsx', 'Default')
  .addExample('Header/story/RightContent.example.jsx', 'Right content')
