import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage('Form', 'Form', 'Picasso Forms')

page
  .createChapter()
  .addTextSection(
    `
Form is a wrapper for 'react-final-form' Form component.
    `
  )
  .addExample('Form/story/Default.example.tsx', 'Default', 'picasso-form')
