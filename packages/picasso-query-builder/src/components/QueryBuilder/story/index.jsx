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
  .addTextSection(
    `
  Didn't find a required Pictogram? Feel free to add it yourself - [how to add icon or pictogram](https://github.com/toptal/picasso#adding-icons-and-pictograms)
  `
  )
// .addExample('Pictogram/story/List.example.tsx', {
//   title: 'List of all pictograms',
//   showEditCode: false,
//   takeScreenshot: false,
// })
// .addExample('Pictogram/story/Default.example.tsx', 'Default')
// .addExample('Pictogram/story/Scale.example.tsx', {
//   title: 'Scale',
//   description:
//     'Recommended way is to use `scale` property to adjust the pictogram scale, you should avoid scaling pictograms with either `font-size` or `width` and `height` because our pictograms are pixel perfect and designed for a specific size. When scaling of this pictogram occurs, it is breaking our visual guidelines',
// })
