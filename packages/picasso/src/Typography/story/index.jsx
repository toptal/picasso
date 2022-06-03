import { Typography } from '../Typography'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Typography',
  'Our primary typeface is Proxima Nova, a contemporary font that combines humanist proportions with a geometric appearance—making it the perfect typeface.'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Typography, name: 'Typography' })

page
  .createChapter()
  .addExample('Typography/story/Default.example.tsx', {
    title: 'Normal text',
    takeScreenshot: false
  })
  .addExample('Typography/story/Headings.example.tsx', {
    title: 'Headings',
    takeScreenshot: false
  })
  .addExample('Typography/story/Types.example.tsx', {
    title: 'Types',
    description:
      'Long-form text uses a 1.5 ratio to calculate line-height values.',
    takeScreenshot: false
  })
  .addExample('Typography/story/InheritSize.example.tsx', {
    title: 'Inherit size',
    description: `
      In some cases, you may want to use the font size inherited
      from the container where the Topography is nested.
    `,
    takeScreenshot: false
  })
  .addExample('Typography/story/Alignment.example.tsx', {
    title: 'Alignment',
    takeScreenshot: false
  })
  .addExample('Typography/story/Weights.example.tsx', {
    title: 'Weights',
    takeScreenshot: false
  })
  .addExample('Typography/story/Colors.example.tsx', {
    title: 'Colors',
    takeScreenshot: false
  })
  .addExample('Typography/story/As.example.tsx', {
    title: 'Augment as another HTML element',
    description: `
      In some cases you may want to change the default
      HTML tag used for Typography. In this cases you can 
      use 'as' property.
    `,
    takeScreenshot: false
  })
  .addExample('Typography/story/Decoration.example.tsx', {
    title: 'Decoration',
    takeScreenshot: false
  })
  .addExample('Typography/story/LineThrough.example.tsx', {
    title: 'Line through',
    takeScreenshot: false
  })
