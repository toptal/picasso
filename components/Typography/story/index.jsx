import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Typography',
  'Our primary typeface is Proxima Nova, a contemporary font that combines humanist proportions with a geometric appearance—making it the perfect typeface.'
)

const docs = [
  {
    name: 'children',
    type: 'node',
    description: 'Components children'
  },
  {
    name: 'variant',
    type: 'enum',
    description: 'The variant to use',
    enums: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'large',
      'small',
      'large',
      'caption'
    ]
  },
  {
    name: 'align',
    type: 'enum',
    description: 'Select font-weight that should be used',
    enums: ['inherit', 'left', 'center', 'right', 'justify']
  },
  {
    name: 'weight',
    type: 'enum',
    defaultValue: 'regular',
    description: 'Select font-weight that should be used',
    enums: ['thin', 'light', 'regular', 'semibold', 'bold']
  }
]

page
  .addDocs(docs)
  .addExample('Typography/story/Default.example.jsx', 'Normal text')
  .addExample('Typography/story/Headings.example.jsx', 'Headings')
  .addExample('Typography/story/Types.example.jsx', {
    title: 'Types',
    description:
      'Long-form text uses a 1.5 ratio to calculate line-height values.'
  })
  .addExample('Typography/story/Alignment.example.jsx', 'Alignment')
  .addExample('Typography/story/Weights.example.jsx', 'Weights')
