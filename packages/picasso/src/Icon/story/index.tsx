// @ts-ignore
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage('Icons')

page
  .createChapter()
  .addDocs([
    {
      name: 'color',
      type: {
        name: 'enum',
        enums: [
          '"inherit"',
          '"black"',
          '"blue"',
          '"green"',
          '"grey"',
          '"red"',
          '"yellow"',
          '"light-grey"',
          '"dark-grey"',
          '"light-blue"'
        ]
      },
      description: 'Color of icon'
    },
    {
      name: 'className',
      type: 'string',
      description: 'Class applied to SVG element'
    },
    {
      name: 'style',
      type: 'CSSProperties',
      description: 'Style applied to SVG element'
    },
    {
      name: 'scale',
      type: 'enum',
      description: 'scale of the icon',
      enums: [1, 2, 3, 4]
    }
  ])
  .addTextSection(
    `
  Didn't find a required Icon? Feel free to add it yourself - [how to add icon](https://github.com/toptal/picasso#add-icon)
  `
  )
  .addExample('Icon/story/List.example.tsx', {
    title: 'List of all icons',
    showEditCode: false
  }) // picasso-skip-visuals
  .addExample('Icon/story/Default.example.tsx', 'Default')
  .addExample('Icon/story/Scale.example.tsx', {
    title: 'Scale',
    description:
      'Recommended way is to use `scale` property to adjust the icon scale, you should avoid scaling icons with either `font-size` or `width` and `height` because our icons are pixel perfect and designed for a specific size. When scaling of this icon occurs, it is breaking our visual guidelines'
  })
  .addExample('Icon/story/Color.example.tsx', 'Color')
  .addExample('Icon/story/WithText.example.tsx', 'With text')
