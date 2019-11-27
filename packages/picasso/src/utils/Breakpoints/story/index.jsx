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

page
  .createChapter()
  .addExample('utils/Breakpoints/story/MediaQueries.example.jsx', {
    title: 'Media queries',
    description: `
    Picasso provides a function 'screens' to be able to 
    easily create media queries based on the given breakpoints
  `
  }) // picasso-skip-visuals
  .addExample('utils/Breakpoints/story/Breakpoints.example.jsx', {
    title: 'Breakpoints',
    description: `
    The list of breakpoint names and pixel-values we use while we design and do layouts
  `,
    showEditCode: false
  }) // picasso-skip-visuals
  .addExample('utils/Breakpoints/story/useBreakpoint.example.jsx', {
    title: 'useBreakpoint',
    description: `
    Provides programmatic way to check what screen size defined by breakpoints is active
  `,
    showEditCode: false
  }) // picasso-skip-visuals
  .addExample('utils/Breakpoints/story/useScreens.example.jsx', {
    title: 'useScreens',
    description: `
    Provides a programmatic way to switch between different values depending on screen size. The function returned by useScreens is memoized per screen size, so there are no performance penalties if re-rendering happens often.
  `,
    showEditCode: true
  }) // picasso-skip-visuals
