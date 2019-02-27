import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Spacer',
  'Use Spacer to add space between 2 elements.'
)

const docs = [
  {
    name: 'children',
    type: 'node',
    description: 'Components children'
  },
  {
    name: 'top',
    type: 'number',
    defaultValue: '0',
    description: 'Top margin'
  },
  {
    name: 'right',
    type: 'number',
    defaultValue: '0',
    description: 'Right margin'
  },
  {
    name: 'bottom',
    type: 'number',
    defaultValue: '0',
    description: 'Bottom margin'
  },
  {
    name: 'left',
    type: 'number',
    defaultValue: '0',
    description: 'Left margin'
  },
  {
    name: 'inline',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Whether component should be rendered inline with other components'
  }
]

page
  .addDocs(docs)
  .addExample('Spacer/story/Default.example.jsx', 'Default')
  .addExample('Spacer/story/Inline.example.jsx', 'Inline')
