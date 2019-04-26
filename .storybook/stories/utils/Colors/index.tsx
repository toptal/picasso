import PicassoBook from '../../../components/PicassoBook'

const page = PicassoBook.createPage(
  'Colors',
  `
    The Toptal color palette comprises the core brand colors
    plus a range of shades and tints.
  `,
  'Utils'
)

page.addExample('utils/Colors/Default.example.jsx', 'Colors')
page.addExample('utils/Colors/HowToUse.example.jsx', 'How to use')
