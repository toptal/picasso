import { Container } from '../Container'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Layout').createPage(
  'Container',
  'Use Container to add space between 2 elements.'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Container, name: 'Container' })

page
  .createChapter()
  .addExample('Container/story/Default.example.tsx', 'Default')
  .addExample('Container/story/Inline.example.tsx', 'Inline')
  .addExample('Container/story/Bordered.example.tsx', 'With border')
  .addExample('Container/story/Variant.example.tsx', 'Variants')
  .addExample('Container/story/Spacing.example.tsx', {
    title: 'Spacing',
    description: 'Creating inner and outer space for component',
    extra: `
Spacing is based on size enum that gets transformed into **em** unit in following manner: 
- xsmall = 0.5em,
- small = 1em,
- medium = 1.5em,
- large = 2em
- xlarge = 2.5em

For other custom  cases use **number** in em units or **className** to define spacings.
`
  })
