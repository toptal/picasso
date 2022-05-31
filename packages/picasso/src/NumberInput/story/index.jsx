import { NumberInput } from '../NumberInput'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'NumberInput',
  'Input component for numbers'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: NumberInput, name: 'NumberInput' })

page
  .createChapter()
  .addExample('NumberInput/story/Default.example.tsx', 'Default')
  .addExample('NumberInput/story/Disabled.example.tsx', 'Disabled')
  .addExample('NumberInput/story/Status.example.tsx', {
    title: 'Status',
    takeScreenshot: false,
  }) // picasso-skip-visuals
  .addExample('NumberInput/story/WithIcon.example.tsx', 'With Icon')
  .addExample('NumberInput/story/Sizes.example.tsx', 'Sizes')
