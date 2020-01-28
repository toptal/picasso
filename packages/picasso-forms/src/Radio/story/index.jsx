import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Form.Radio',
  'Form radio group',
  'Picasso Forms'
)

page
  .createChapter()
  .addTextSection(
    `
Form.Radio supports all the same props which Picasso Radio supports.
    `
  )
  .addExample('Radio/story/Default.example.tsx', 'Default', 'picasso-forms')
