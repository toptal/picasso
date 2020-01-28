import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage('Form.Input', 'Form input', 'Picasso Forms')

page.createChapter().addExample('Input/story/Default.example.tsx', 'Default')
