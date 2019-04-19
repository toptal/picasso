import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage('Icons')

page
  .addDocs([
    {
      name: 'size',
      type: 'number',
      defaultValue: 'inherit',
      description: 'Size of icon in `rem`'
    },
    {
      name: 'color',
      type: 'string',
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
    }
  ])
  .addExample('Icon/story/List.example.jsx', 'List of all icons')
  .addExample('Icon/story/Default.example.jsx', 'Default')
  .addExample('Icon/story/Size.example.jsx', {
    title: 'Size',
    description:
      'Recommended way to use `font-size` to adjust the icon size, but also you can specify `height` and `width` within styles'
  })
  .addExample('Icon/story/Color.example.jsx', 'Color')
  .addExample('Icon/story/WithText.example.jsx', 'With text')
