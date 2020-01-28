import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Form.NumberInput',
  'Form number input',
  'Picasso Forms'
)

page
  .createChapter()
  .addTextSection(
    `
Form.NumberInput supports all the same props which Picasso NumberInput supports.
    `
  )
  .addExample(
    'NumberInput/story/Default.example.tsx',
    'Default',
    'picasso-forms'
  )
