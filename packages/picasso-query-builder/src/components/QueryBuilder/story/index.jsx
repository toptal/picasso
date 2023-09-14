import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Query Builder').createPage(
  'QueryBuilder'
)

page
  .createChapter()
  .addDocs([
    {
      name: 'className',
      type: 'string',
      description: 'Class applied to SVG element',
    },
    {
      name: 'style',
      type: 'CSSProperties',
      description: 'Style applied to SVG element',
    },
    {
      name: 'scale',
      type: 'enum',
      description: 'scale of the pictogram',
      enums: ['1', '2'],
    },
  ])
  .addExample('components/QueryBuilder/story/Default.example.tsx', 'Default')
