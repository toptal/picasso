import { NumberInput } from '../NumberInput'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'NumberInput',
  `Input component for numbers

  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: NumberInput, name: 'NumberInput' })

page
  .createChapter()
  .addExample(
    'NumberInput/story/Default.example.tsx',
    'Default',
    'base/NumberInput'
  )
  .addExample(
    'NumberInput/story/Disabled.example.tsx',
    'Disabled',
    'base/NumberInput'
  )
  .addExample(
    'NumberInput/story/Status.example.tsx',
    'Status',
    'base/NumberInput'
  )
  .addExample(
    'NumberInput/story/WithIcon.example.tsx',
    'With Icon',
    'base/NumberInput'
  )
  .addExample(
    'NumberInput/story/WithEndAdornment.example.tsx',
    'With End Adornment',
    'base/NumberInput'
  )
  .addExample(
    'NumberInput/story/Sizes.example.tsx',
    'Sizes',
    'base/NumberInput'
  )
