import PicassoBook from '~/.storybook/components/PicassoBook'

import gridItemStory from '@components/GridItem/story'

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
  .createTabChapter('Props')
  .addComponentDocs({ component: Grid, name: 'Grid' })
  .addComponentDocs(gridItemStory.componentDocs)

page
  .createChapter()
  .addExample('Grid/story/Alignment.example.jsx', 'Alignment')
  .addExample('Grid/story/Direction.example.jsx', 'Direction')

page.connect(gridItemStory.chapter)
