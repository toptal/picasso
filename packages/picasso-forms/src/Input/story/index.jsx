import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage('Form.Input', 'Form input', 'Picasso Forms')

page
  .createChapter()
  .addTextSection(
    `
Form.Input supports all the same props which Picasso Input supports.
    `
  )
  .addExample('Input/story/Default.example.tsx', 'Default', 'picasso-forms')
