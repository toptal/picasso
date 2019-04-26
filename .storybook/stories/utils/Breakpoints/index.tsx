import PicassoBook from '../../../components/PicassoBook'

const page = PicassoBook.createPage(
  'Breakpoints',
  `
    For optimal user experience, we need to be able to adapt layout
    at various breakpoints. Each breakpoint matches with a fixed screen
    width.
  `,
  'Utils'
)

page.addExample('utils/Breakpoints/Default.example.jsx', 'Breakpoints')
