import { Loader } from '../Loader'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Loader',
  'Loaders indicate that an action is underway and that the user must wait to proceed until it is finished.'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Loader, name: 'Loader' })

page
  .createChapter()
  .addExample('Loader/story/Default.example.tsx', 'Default')
  .addExample('Loader/story/WithLabel.example.tsx', 'With label')
  .addExample('Loader/story/Inline.example.tsx', 'With inline content')
  .addExample('Loader/story/Sizes.example.tsx', 'Sizes')
  .addExample('Loader/story/Variants.example.tsx', 'Variants')
  .addExample('Loader/story/ControlledValue.example.tsx', {
    title: 'Controlled value',
    description: 'Loader with determined or static values'
  })
