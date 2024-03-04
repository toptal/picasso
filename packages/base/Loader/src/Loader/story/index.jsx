import { Loader } from '../Loader'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Loader',
  `Loaders indicate that an action is underway and that the user must wait to proceed until it is finished.
  
  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Loader, name: 'Loader' })

page
  .createChapter()
  .addExample('Loader/story/Default.example.tsx', 'Default', 'base/Loader')
  .addExample('Loader/story/WithLabel.example.tsx', 'With label', 'base/Loader')
  .addExample(
    'Loader/story/Inline.example.tsx',
    'With inline content',
    'base/Loader'
  )
  .addExample('Loader/story/Sizes.example.tsx', 'Sizes', 'base/Loader')
  .addExample('Loader/story/Variants.example.tsx', 'Variants', 'base/Loader')
  .addExample(
    'Loader/story/ControlledValue.example.tsx',
    {
      title: 'Controlled value',
      description: 'Loader with determined or static values',
    },
    'base/Loader'
  )
