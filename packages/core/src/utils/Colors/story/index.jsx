import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Colors',
  `
    The Toptal color palette comprises the core brand colors
    plus a range of shades and tints.
  `,
  'Utils'
)

page
  .createChapter()
  .addExample('utils/Colors/story/HowToUse.example.jsx', 'How to use') // picasso-skip-visuals
  .addExample('utils/Colors/story/Default.example.jsx', 'Colors')
