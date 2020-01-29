import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage('Form', 'Form', 'Picasso Forms')

page
  .createChapter()
  .addTextSection(
    `
Form is a wrapper for 'react-final-form' Form component. It also
provides inside all the necessary input components types.
    `
  )
  .addExample('Form/story/Default.example.tsx', 'Default', 'picasso-form')
  .addExample(
    'Form/story/CustomValidator.example.tsx',
    'Custom validator',
    'picasso-form'
  ) // picasso-skip-visuals
  .addExample(
    'Form/story/BackendCommunication.example.tsx',
    'Backend communication',
    'picasso-form'
  ) // picasso-skip-visuals
