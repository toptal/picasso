import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Form.Checkbox',
  'Form checkbox',
  'Picasso Forms'
)

page
  .createChapter()
  .addTextSection(
    `
Form.Checkbox supports all the same props which Picasso Checkbox supports.
    `
  )
  .addExample('Checkbox/story/Default.example.tsx', 'Default', 'picasso-forms')
