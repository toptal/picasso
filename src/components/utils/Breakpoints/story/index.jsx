import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Breakpoints',
  `
    For optimal user experience, we need to be able to adapt layout
    at various breakpoints. Each breakpoint matches with a fixed screen
    width.
  `,
  'Utils'
)

page.addExample('utils/Breakpoints/story/MediaQueries.example.jsx', {
  title: 'Media queries',
  description: `
    Picasso provides a function 'screens' to be able to 
    easily create media queries based on the given breakpoints
  `
})
page.addExample('utils/Breakpoints/story/Breakpoints.example.jsx', {
  title: 'Breakpoints',
  description: `
    The list of breakpoint names and pixel-values we use while we design and do layouts
  `,
  showEditCode: false
})
