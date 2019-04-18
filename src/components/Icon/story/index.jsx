import PicassoBook from '~/.storybook/components/PicassoBook'

import * as icons from '../index'

const page = PicassoBook.createPage(
  'Icons',
  `
    List of available icons:

    ${Object.keys(icons).join(', ')}
  `
)

page
  .addExample('Icon/story/Default.example.jsx', 'Default')
  .addExample('Icon/story/Size.example.jsx', {
    title: 'Size',
    description:
      'Recommended way to use `font-size` to adjust the icon size, but also you can specify `height` and `width` within styles'
  })
  .addExample('Icon/story/Color.example.jsx', 'Color')
  .addExample('Icon/story/WithText.example.jsx', 'With text')
