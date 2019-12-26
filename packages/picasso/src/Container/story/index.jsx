import { Container } from '../Container'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Container',
  'Use Container to add space between 2 elements.',
  'Layout'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Container, name: 'Container' })

page
  .createChapter()
  .addExample('Container/story/Default.example.jsx', 'Default')
  .addExample('Container/story/Inline.example.jsx', 'Inline')
  .addExample('Container/story/Bordered.example.jsx', 'With border')
  .addExample('Container/story/Variant.example.jsx', 'Variants')
  .addExample('Container/story/Spacing.example.jsx', {
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
