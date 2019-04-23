import PicassoBook from '~/.storybook/components/PicassoBook'

import { Grid } from '../Grid'

const page = PicassoBook.createPage(
  'Grid',
  `The layout element which is providing grid container functionality. 
  The grid is built on top of flexbox functionality and the layout can 
  be adjusted using the flexbox technics. The grid is a wrapper for the 
  GridItem components.`,
  'Layout'
)

page
  .addComponentDocs(Grid)
  .addExample('Grid/story/Alignment.example.jsx', 'Alignment')
  .addExample('Grid/story/Direction.example.jsx', 'Direction')
