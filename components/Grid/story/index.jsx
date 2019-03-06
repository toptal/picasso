import PicassoBook from '../../../.storybook/components/PicassoBook'
import { Grid } from '../Grid'

const page = PicassoBook.createPage(
  'Grid',
  `The layout element which is providing grid container functionality. 
  The grid is built on top of flexbox functionality and the layout can 
  be adjusted using the flexbox technics. The grid is a wrapper for the 
  GridItem components.`
)

page
  .addComponentDocs(Grid, {
    spacing: {
      type: 'enum',
      enums: [0, 8, 16, 24, 32, 40]
    },
    direction: {
      type: 'enum',
      enums: ['row', 'row-reverse', 'column', 'column-reverse']
    },
    alignItems: {
      type: 'enum',
      enums: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline']
    },
    justify: {
      type: 'enum',
      enums: [
        'flex-start',
        'center',
        'flex-end',
        'space-between',
        'space-around',
        'space-evenly'
      ]
    }
  })
  .addExample('Grid/story/Alignment.example.jsx', 'Alignment')
  .addExample('Grid/story/Direction.example.jsx', 'Direction')
