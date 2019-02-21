import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Loader',
  'Loaders indicate that an action is underway and that the user must wait to proceed until it is finished.'
)

page
  .addExample('Loader/story/Default.example.jsx', 'Default')
  .addExample('Loader/story/WithLabel.example.jsx', 'With label')
  .addExample('Loader/story/Inline.example.jsx', 'With inline content')
  .addExample('Loader/story/Indeterminate.example.jsx', 'Indeterminate')
  .addExample('Loader/story/Sizes.example.jsx', 'Sizes')
  .addExample('Loader/story/ControlledValue.example.jsx', {
    title: 'Controlled value',
    description: 'Loader with determined or static values'
  })
