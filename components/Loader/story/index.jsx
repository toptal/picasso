import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Loader',
  'Loaders indicate that an action is underway and that the user must wait to proceed until it is finished.'
)

const docs = [
  {
    name: 'className',
    type: 'string',
    description: 'Additional classes passed to wrapper component'
  },
  {
    name: 'inline',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Whether loader should be rendered inline with other elements in layout'
  },
  {
    name: 'label',
    type: 'string',
    description: 'Additional text that can be rendered under the loader'
  },
  {
    name: 'size',
    type: 'enum',
    defaultValue: 'default',
    description: 'Specify predefined loader sizes',
    enums: ['small', 'default', 'large']
  },
  {
    name: 'value',
    type: 'number',
    defaultValue: '0',
    description:
      'The value of the progress indicator for the determinate and static variants. Value between 0 and 100.'
  },
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'indeterminate',
    description:
      'The variant to use. Use indeterminate when there is no progress value',
    enums: ['determinate', 'indeterminate', 'static']
  }
]

page
  .addDocs(docs)
  .addExample('Loader/story/Default.example.jsx', 'Default')
  .addExample('Loader/story/WithLabel.example.jsx', 'With label')
  .addExample('Loader/story/Inline.example.jsx', 'With inline content')
  .addExample('Loader/story/Indeterminate.example.jsx', 'Indeterminate')
  .addExample('Loader/story/Sizes.example.jsx', 'Sizes')
  .addExample('Loader/story/ControlledValue.example.jsx', {
    title: 'Controlled value',
    description: 'Loader with determined or static values'
  })
