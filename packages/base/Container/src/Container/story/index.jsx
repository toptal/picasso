import { Container } from '../Container'
import PicassoBook from '~/.storybook/components/PicassoBook'
import {
  DEFAULT_BORDERED,
  DEFAULT_ROUNDED,
  DEFAULT_INLINE,
  DEFAULT_AS,
} from '../constants'

const page = PicassoBook.section('Layout').createPage(
  'Container',
  `Use Container to add space between 2 elements.

  ${PicassoBook.createSourceLink(__filename)}
  `
)

page.createTabChapter('Props').addComponentDocs({
  component: Container,
  name: 'Container',
  additionalDocs: {
    inline: {
      defaultValue: String(DEFAULT_INLINE),
    },
    as: {
      defaultValue: DEFAULT_AS,
    },
    bordered: {
      defaultValue: String(DEFAULT_BORDERED),
    },
    rounded: {
      defaultValue: String(DEFAULT_ROUNDED),
    },
  },
})

page
  .createChapter()
  .addExample(
    'Container/story/Default.example.tsx',
    'Default',
    'base/Container'
  )
  .addExample(
    'Container/story/Spacing.example.tsx',
    {
      title: 'Spacing',
      description: 'Creating inner and outer space for component',
      extra: `
Spacing is aligned with BASE design and gets transformed into **rem** units in following manner:

- SPACING_0 = 0rem,
- SPACING_1 = 0.25rem,
- SPACING_2 = 0.5rem,
- SPACING_3 = 0.75rem,
- SPACING_4 = 1rem,
- SPACING_6 = 1.5rem,
- SPACING_8 = 2rem,
- SPACING_10 = 2.5rem,
- SPACING_12 = 3rem

`,
    },
    'base/Container'
  )
  .addExample(
    'Container/story/Responsive.example.tsx',
    {
      title: 'Responsive Spacing',
      screenshotBreakpoints: true,
    },
    'base/Container'
  )
  .addExample('Container/story/Inline.example.tsx', 'Inline', 'base/Container')
  .addExample(
    'Container/story/Bordered.example.tsx',
    'With border',
    'base/Container'
  )
  .addExample(
    'Container/story/Variant.example.tsx',
    'Variants',
    'base/Container'
  )
  .addExample(
    'Container/story/TextAlign.example.tsx',
    'TextAlign',
    'base/Container'
  )
  .addExample('Container/story/Wrap.example.tsx', 'Wrap', 'base/Container')
