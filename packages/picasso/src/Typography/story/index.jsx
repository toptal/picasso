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
  .addExample('Typography/story/Default.example.jsx', 'Normal text')
  .addExample('Typography/story/Headings.example.jsx', 'Headings')
  .addExample('Typography/story/Types.example.jsx', {
    title: 'Types',
    description:
      'Long-form text uses a 1.5 ratio to calculate line-height values.'
  })
  .addExample('Typography/story/InheritSize.example.jsx', {
    title: 'Inherit size',
    description: `
      In some cases, you may want to use the font size inherited
      from the container where the Topography is nested.
    `
  })
  .addExample('Typography/story/Alignment.example.jsx', 'Alignment')
  .addExample('Typography/story/Weights.example.jsx', 'Weights')
  .addExample('Typography/story/Colors.example.jsx', 'Colors')
  .addExample('Typography/story/As.example.jsx', {
    title: 'Augment as another HTML element',
    description: `
      In some cases you may want to change the default
      HTML tag used for Typography. In this cases you can 
      use 'as' property.
    `
  })
  .addExample('Typography/story/Decoration.example.tsx', 'Decoration')
  .addExample('Typography/story/LineThrough.example.jsx', 'Line through')
