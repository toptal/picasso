import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Logo',
  `
  The Toptal logo is the visual representation of the products we create.
  It was designed to be instantly recognizable to our users, partners and
  internal teams. Or goal is to ensure each logo instance contributes to our
  brand. This requires consistency in placement, scale, color and location.
`
)

const docs = [
  {
    name: 'emblem',
    type: 'boolean',
    description: 'Whether emblem variant should be rendered instead of wordmark'
  },
  {
    name: 'variant',
    type: 'enum',
    description: 'Color variant which should be sued',
    defaultValue: 'default',
    enums: ['default', 'white', 'black']
  }
]

page
  .addDocs(docs)
  .addExample('Logo/story/Default.example.jsx', 'Default')
  .addExample('Logo/story/Emblem.example.jsx', 'Emblem')
  .addExample('Logo/story/Variants.example.jsx', 'Variants')
