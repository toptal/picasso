import { NumberInput } from '../NumberInput'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'NumberInput',
  'Input component for numbers'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: NumberInput, name: 'NumberInput' })

page
  .createChapter()
  .addExample('NumberInput/story/Default.example.tsx', 'Default')
