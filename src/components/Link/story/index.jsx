import PicassoBook from '~/.storybook/components/PicassoBook'

import { Link } from '../Link'

const page = PicassoBook.createPage(
  'Link',
  'The Link component allows you to easily customize anchor elements with your theme colors and typography styles.'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Link, name: 'Link' })

page
  .createChapter()
  // .addExample('Link/story/Default.example.tsx', 'Default')
  // .addExample('Link/story/Action.example.jsx', 'Action')
  // .addExample('Link/story/Underline.example.jsx', 'Underline')
  // .addExample('Link/story/FontSize.example.jsx', 'Font Size')
  // .addExample('Link/story/Invert.example.jsx', 'Invert')
  .addExample('Link/story/Routing.example.tsx', {
    title: 'Routing',
    description:
      'An example how to use picasso Link with ReactRouter Link component'
  }) // picasso-skip-visuals
