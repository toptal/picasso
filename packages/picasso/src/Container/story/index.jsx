import { Container } from '../Container'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Layout').createPage(
  'Container',
  `Use Container to add space between 2 elements.
  
  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Container, name: 'Container' })

page
  .createChapter()
  .addExample('Container/story/Default.example.tsx', 'Default')
  .addExample('Container/story/Spacing.example.tsx', {
    title: 'Spacing',
    description: 'Creating inner and outer space for component',
    extra: `
Spacing is based on BASE design enums that gets transformed into **rem** unit in following manner:

| Spacing name  | Value   |
| ------------- | ------- |
| "SPACING_0"   | 0rem    |
| "SPACING_1"   | 0.25rem |
| "SPACING_2"   | 0.5rem  |
| "SPACING_3"   | 0.75rem |
| "SPACING_4"   | 1rem    |
| "SPACING_6"   | 1.5rem  |
| "SPACING_8"   | 2rem    |
| "SPACING_10"  | 2.5rem  |
| "SPACING_12"  | 3rem    |

`,
  })
  .addExample('Container/story/Responsive.example.tsx', {
    title: 'Responsive Spacing',
    screenshotBreakpoints: true,
  })
  .addExample('Container/story/Inline.example.tsx', 'Inline')
  .addExample('Container/story/Bordered.example.tsx', 'With border')
  .addExample('Container/story/Variant.example.tsx', 'Variants')
  .addExample('Container/story/TextAlign.example.tsx', 'TextAlign')
