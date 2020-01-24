import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Form.Radio',
  'Form radio group',
  'Picasso Forms'
)

page.createChapter().addExample('Radio/story/Default.example.tsx', 'Default')
