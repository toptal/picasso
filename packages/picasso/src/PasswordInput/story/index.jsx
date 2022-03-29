import { PasswordInput } from '../PasswordInput'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'PasswordInput',
  'Input component for passwords'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: PasswordInput, name: 'PasswordInput' })

page
  .createChapter()
  .addExample('PasswordInput/story/Default.example.tsx', 'Default') // picasso-skip-visuals
  .addExample('PasswordInput/story/Disabled.example.tsx', 'Disabled') // picasso-skip-visuals
  .addExample('PasswordInput/story/Status.example.tsx', 'Status') // picasso-skip-visuals
