import { Backdrop } from '../Backdrop'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage('Backdrop')

page.createTabChapter('Props').addComponentDocs({
  component: Backdrop,
  name: 'Backdrop',
})

page
  .createChapter()
  .addExample('Backdrop/story/Default.example.tsx', 'Default', 'base/Backdrop')
  .addExample(
    'Backdrop/story/Invisible.example.tsx',
    'Invisible',
    'base/Backdrop'
  )
