import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Utils').createPage(
  'Colors',
  `
      The Toptal color palette comprises the core brand colors
      plus a range of shades and tints.
    `
)

page
  .createChapter()
  .addExample('utils/Colors/story/HowToUse.example.tsx', {
    title: 'How to use',
    takeScreenshot: false,
  })
  .addExample('utils/Colors/story/Default.example.tsx', 'Colors')
