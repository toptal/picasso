import gridItemStory from '../../GridItem/story'
import { Grid } from '../Grid'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Layout').createPage(
  'Grid',
  `
    The layout element which is providing grid container functionality. 
    The grid is built on top of flexbox functionality and the layout can 
    be adjusted using the flexbox technics. The grid is a wrapper for the 
    GridItem components.
    
    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/b30dc822-8d49-44ca-bb05-871c964cb45f?collectionLayerId=2969c323-9ea1-4413-96f9-d358ba64ebd1&mode=design&present=true'
    )}

    ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Grid, name: 'Grid' })
  .addComponentDocs(gridItemStory.componentDocs)

page
  .createChapter()
  .addExample('Grid/story/Alignment.example.tsx', {
    title: 'Alignment',
    screenshotBreakpoints: true,
  })
  .addExample('Grid/story/Direction.example.tsx', {
    title: 'Direction',
    screenshotBreakpoints: true,
  })
  .addExample('Grid/story/Wrapping.example.tsx', {
    title: 'Wrapping',
    screenshotBreakpoints: true,
  })
  .addExample('Grid/story/ResponsiveSpacing.example.tsx', {
    title: 'Responsive spacing',
    description:
      'When `spacing` is not explicitly specified by consumer, grid adjusts it according to the screen size (please see the property description for details). You can try to resize screen, to see how different spacing is applied.',
    screenshotBreakpoints: true,
  })

page.connect(gridItemStory.chapter)
