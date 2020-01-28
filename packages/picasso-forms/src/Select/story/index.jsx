import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Form.Select',
  'Form select',
  'Picasso Forms'
)

page
  .createChapter()
  .addTextSection(
    `
Form.Select supports all the same props which Picasso Select supports.
    `
  )
  .addExample('Select/story/Default.example.tsx', 'Default', 'picasso-forms')
